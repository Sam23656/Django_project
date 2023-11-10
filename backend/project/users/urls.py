from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
]