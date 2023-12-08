from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from .consumers import ChatConsumer
from .middleware import WebSocketAuthMiddleware

application = ProtocolTypeRouter(
    {
        "websocket": WebSocketAuthMiddleware(
            URLRouter(
                [
                    path("ws/chat/<str:room_name>/", ChatConsumer.as_asgi()),
                ]
            )
        ),
    }
)
