from django.urls import path, include, re_path
from users.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'', UserViewSet)

urlpatterns = [
    path('/', include(router.urls)),
    path('/get_id/<str:email>/', get_user_id_by_email),
    path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.jwt')),
]
