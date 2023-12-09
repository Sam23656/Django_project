import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from users.models import CustomUser
from .models import Chat


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        if self.scope["user"].is_anonymous:
            await self.close()
        else:
            filtered_chat = await self.get_filtered_chats()
            if filtered_chat:
                await self.accept()
            else:
                await self.chat_create(
                    await self.get_user_from_id(self.scope["user"].id),
                    await self.get_user_from_id(self.scope["path"].split("/")[-2][1:]),
                )
                await self.accept()

    @database_sync_to_async
    def get_filtered_chats(self):
        all_chats = Chat.objects.all()
        return list(
            filter(lambda chat: chat.get_chat_id() == self.room_name or chat.get_chat_id() == reversed(self.room_name),
                   all_chats))

    @database_sync_to_async
    def get_user_from_id(self, user_id):
        return CustomUser.objects.get(id=user_id)

    @database_sync_to_async
    def chat_create(self, first_user, second_user):
        chat = Chat(first_user=first_user, second_user=second_user)
        chat.save()
        return True

    async def chat_message(self, event):
        message = event["message"]
        username = self.scope["user"].username

        await self.send(
            text_data=json.dumps({"message": message, "username": username})
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        await self.chat_message(
            {
                "type": "chat.message",
                "message": message,
                "username": self.scope["user"].username,
            },
        )
