from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from users.models import CustomUser
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken


class WebSocketAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query = scope.get("query_string", [])
        auth_header = query.split(b"=", 1)
        if auth_header[0] == b"Token":
            token = auth_header[1]
            user = await self.get_user_from_token(token)
            if user:
                scope["user"] = user
            else:
                print("User not found")

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user_from_token(self, token):
        decoded_token = AccessToken(token)
        return CustomUser.objects.get(id=decoded_token.payload['user_id'])
