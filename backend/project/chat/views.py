from django.shortcuts import render
from rest_framework import viewsets

from chat.models import Chat
from chat.serializers import ChatSerializer
from .permisions import ListOrDetailPermission


# Create your views here.

class ChatView(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [ListOrDetailPermission]

