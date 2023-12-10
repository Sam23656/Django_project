from django.shortcuts import render
from rest_framework import viewsets

from chat.models import Chat, Message
from chat.serializers import ChatSerializer, MessageSerializer
from .permisions import ListOrDetailPermission


# Create your views here.

class ChatView(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [ListOrDetailPermission]


class MessageView(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [ListOrDetailPermission]
