import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from users.models import CustomUser
from .models import Chat, Message


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.second_user = None
        self.user = None
        self.chat = None
        self.room_group_name = None
        self.room_name = None

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        if self.scope["user"].is_anonymous:
            await self.close()
        else:
            filtered_chat = await self.get_filtered_chats()
            if filtered_chat:
                self.chat = filtered_chat[0]
                self.user = await self.get_user_from_id(self.scope["user"].id)
                second_user = str(self.chat.get_chat_id()).split(f'{self.user.id}')
                second_user = await self.filter_second_user(second_user)
                self.second_user = await self.get_user_from_id(second_user[0])

            else:
                self.chat = await self.chat_create(
                    await self.get_user_from_id(self.scope["user"].id),
                    await self.get_user_from_id(self.scope["path"].split("/")[-2][1:]),
                )
                self.user = await self.get_user_from_id(self.scope["user"].id)
                self.second_user = await self.get_user_from_id(self.scope["path"].split("/")[-2][1:])

            if self.chat:
                pass
            else:
                await self.close()

        self.room_name = self.chat.get_chat_id()
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()
        messages = await self.get_all_messages()
        serialized_messages = await self.serialize_messages(messages)
        await self.send(
            text_data=json.dumps(serialized_messages)
        )

    @staticmethod
    @database_sync_to_async
    def serialize_messages(messages):
        serialized_messages = [
            {
                "message": message.message,
                "username": message.sender.username
            }
            for message in messages
        ]
        return serialized_messages

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
    def message_create(self, sender, receiver, message):
        if sender is None or receiver is None or message is None:
            return False
        message = Message(sender=sender, receiver=receiver, message=message)
        message.save()
        self.chat.messages.add(message)
        return message

    @database_sync_to_async
    def get_all_messages(self):
        return list(self.chat.messages.all())

    async def chat_message(self, event):
        message = event["message"]
        message = await self.message_create(self.user, self.second_user, message)

        await self.send(
            text_data=json.dumps({
                "message": message.message,
                "username": message.sender.username
            })
        )
        return message

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "message": message}
        )
