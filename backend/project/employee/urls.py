from django.urls import path, include

from employee.views import VacancyViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'', VacancyViewSet)

urlpatterns = [
    path('/', include(router.urls)),
]
