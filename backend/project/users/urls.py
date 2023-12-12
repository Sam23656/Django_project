from django.urls import path, include, re_path
from users.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
feedback_router = DefaultRouter()
router.register(r'', UserViewSet)
feedback_router.register(r'', FeedbackViewSet)

urlpatterns = [
    path('feedback/', include(feedback_router.urls)),
    path('', include(router.urls)),
    path('get_id/<str:email>/', get_user_id_by_email),
    path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.jwt')),
]
