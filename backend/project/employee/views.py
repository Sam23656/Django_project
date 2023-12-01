from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from employee.models import Vacancy
from employee.serializers import VacancySerializer


# Create your views here.
class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    permission_classes = [AllowAny]
