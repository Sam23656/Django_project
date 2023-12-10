from django.urls import path, include
from .views import ChatView, MessageView
from rest_framework.routers import DefaultRouter

chat_router = DefaultRouter()
message_router = DefaultRouter()

chat_router.register(r'', ChatView)
message_router.register(r'', MessageView)
urlpatterns = [
    path('Chat/', include(chat_router.urls)),
    path('Message/', include(message_router.urls)),
]
