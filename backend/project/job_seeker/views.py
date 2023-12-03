from django.shortcuts import render
from rest_framework import viewsets
from users.permisions import IsOwnerOrAdminCanReadUpdate

from .models import Resume
from .serializers import ResumeSerializer


# Create your views here.
class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]
