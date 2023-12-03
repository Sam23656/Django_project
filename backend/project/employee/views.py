from django.shortcuts import render
from rest_framework import viewsets

from .models import *
from .serializers import *
from users.permisions import IsOwnerOrAdminCanReadUpdate


# Create your views here.
class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]