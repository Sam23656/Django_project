from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken


class WebSocketAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query = scope.get("headers", [])
        auth_header = query[4][1].decode("utf-8").split(" ")

        if auth_header[0] == "TOKEN":
            token = auth_header[1]
            scope["user"] = await self.get_user_from_token(token)

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            decoded_token = AccessToken(token)
            return get_user_model().objects.get(id=decoded_token.payload['user_id'])
        except:
            return AnonymousUser()