from django.urls import path, include

from .views import ResumeViewSet, JobApplicationViewSet
from rest_framework.routers import DefaultRouter

Resume_router = DefaultRouter()
JobApplication_router = DefaultRouter()

Resume_router.register(r'', ResumeViewSet)
JobApplication_router.register(r'', JobApplicationViewSet)

urlpatterns = [
    path('Resume/', include(Resume_router.urls)),
    path('JobApplication/', include(JobApplication_router.urls)),
]
