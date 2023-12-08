import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.accept()

    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]

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
