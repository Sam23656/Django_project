from django.urls import path, include

from employee.views import VacancyViewSet
from rest_framework.routers import DefaultRouter

Vacancy_router = DefaultRouter()

Vacancy_router.register(r'', VacancyViewSet)

urlpatterns = [
    path('/Vacancy/', include(Vacancy_router.urls)),
]
