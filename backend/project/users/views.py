# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from users.models import CustomUser
from users.serializers import UserSerializer


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
