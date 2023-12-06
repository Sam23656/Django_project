from django.shortcuts import render
from rest_framework import viewsets
from users.permisions import IsOwnerOrAdminCanReadUpdate

from .models import Resume, JobApplication
from .serializers import ResumeSerializer, JobApplicationSerializer


# Create your views here.
class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]
