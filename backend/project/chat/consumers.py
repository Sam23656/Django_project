import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from users.models import CustomUser
from .models import Chat, Message

last_message = None


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.second_user = None
        self.user = None
        self.chat = None
        self.room_group_name = None
        self.room_name = None
        self.last_message = None

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        if self.scope["user"].is_anonymous:
            await self.close()

        self.user = await self.get_user_from_id(self.scope["user"].id)

        filtered_chat = await self.get_filtered_chats()

        if filtered_chat:
            self.chat = filtered_chat[0]
            self.second_user = (
                self.chat.first_user
                if self.user != self.chat.first_user
                else self.chat.second_user
            )
        else:
            self.second_user_id = self.scope["path"].split("/")[-2][1:]
            self.second_user = await self.get_user_from_id(self.second_user_id)

            self.chat = await self.chat_create(self.user, self.second_user)

            if not self.chat:
                await self.close()

        print(f"User: {self.user}")
        print(f"Second User: {self.second_user}")
        print(f"Chat ID: {self.room_name}")

        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()

    @staticmethod
    @database_sync_to_async
    def filter_second_user(second_user):
        return list(filter(lambda item: item != '', second_user))

    @database_sync_to_async
    def get_filtered_chats(self):
        all_chats = Chat.objects.all()
        return list(
            filter(lambda chat: chat.get_chat_id() == self.room_name or chat.get_chat_id() == self.room_name[::-1],
                   all_chats))

    @database_sync_to_async
    def get_user_from_id(self, user_id):
        return CustomUser.objects.get(id=user_id)

    @database_sync_to_async
    def chat_create(self, first_user, second_user):
        if first_user is None or second_user is None:
            return False
        chat = Chat(first_user=first_user, second_user=second_user)
        chat.save()
        return chat

    @database_sync_to_async
    def message_create_async(self, sender, receiver, message):
        global last_message
        if sender is None or receiver is None or message is None:
            return False
        if last_message is not None:
            if last_message.message == message:
                return last_message

        message = Message.objects.create(
            sender=sender,
            receiver=receiver,
            message=message
        )
        last_message = message
        self.chat.messages.add(message)
        return message

    async def chat_message(self, event):
        message = event["message"]
        sender = await self.get_user_from_id(event["sender"])
        if event["sender"] == 'server':
            return
        else:
            message = await self.message_create_async(sender, self.second_user, message)

            await self.send(
                text_data=json.dumps({
                    "message": message.message,
                    "sender": "server",
                    "username": message.sender.username
                })
            )
        return message

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        sender = text_data_json["sender"]

        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "sender": sender, "message": message}
        )
