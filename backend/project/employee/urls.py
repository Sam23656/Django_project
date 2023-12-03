from django.urls import path, include

from employee.views import *
from rest_framework.routers import DefaultRouter

Vacancy_router = DefaultRouter()
Language_router = DefaultRouter()
Tag_router = DefaultRouter()

Vacancy_router.register(r'', VacancyViewSet)
Language_router.register(r'', LanguageViewSet)
Tag_router.register(r'', TagViewSet)

urlpatterns = [
    path('Vacancy/', include(Vacancy_router.urls)),
    path('Language/', include(Language_router.urls)),
    path('Tag/', include(Tag_router.urls)),
]
