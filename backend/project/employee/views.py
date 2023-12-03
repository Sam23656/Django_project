from django.shortcuts import render
from rest_framework import viewsets

from employee.models import Vacancy
from employee.serializers import VacancySerializer
from users.permisions import IsOwnerOrAdminCanReadUpdate


# Create your views here.
class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]
