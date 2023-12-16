# Create your views here.
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status

from users.models import CustomUser, CustomUserManager, Feedback
from users.permisions import IsOwnerOrAdminCanReadUpdate
from users.serializers import UserSerializer, FeedbackSerializer


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]
    pagination_class = PageNumberPagination

    def get(self, request):
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(self.queryset, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def perform_create(self, serializer):
        manager = CustomUserManager()
        user = manager.create_user(
            email=serializer.validated_data['email'],
            username=serializer.validated_data['username'],
            full_name=serializer.validated_data.get('full_name'),
            birthday=serializer.validated_data.get('birthday'),
            password=serializer.validated_data['password'],
            role=serializer.validated_data.get('role', 'job_seeker'),
            company_name=serializer.validated_data.get('company_name'),
            industry=serializer.validated_data.get('industry'),
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


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsOwnerOrAdminCanReadUpdate]
    pagination_class = PageNumberPagination

    def get(self, request):
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(self.queryset, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
