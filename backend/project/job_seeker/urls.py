from django.urls import path, include

from .views import ResumeViewSet
from rest_framework.routers import DefaultRouter

Resume_router = DefaultRouter()

Resume_router.register(r'', ResumeViewSet)

urlpatterns = [
    path('Resume/', include(Resume_router.urls)),
]
