from django.urls import path, include
from .views import ChatView
from rest_framework.routers import DefaultRouter

chat_router = DefaultRouter()

chat_router.register(r'', ChatView)
urlpatterns = [
    path('', include(chat_router.urls)),
]
