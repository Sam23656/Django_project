# Create your views here.
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from users.models import CustomUser, CustomUserManager
from users.permisions import IsAdminOrCreateOnly
from users.serializers import UserSerializer


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrCreateOnly]

    def perform_create(self, serializer):
        manager = CustomUserManager()
        user = manager.create_user(
            email=serializer.validated_data['email'],
            username=serializer.validated_data['username'],
            full_name=serializer.validated_data.get('full_name'),
            birthday=serializer.validated_data.get('birthday'),
            password=serializer.validated_data['password'],
            role=serializer.validated_data.get('role', 'job_seeker')
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


def get_user_id_by_email(request, email):
    if request.method == 'GET':
        try:
            user = get_user_model().objects.get(email=email)
            return HttpResponse(user.id)
        except get_user_model().DoesNotExist:
            return None
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)