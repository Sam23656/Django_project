from rest_framework.serializers import ModelSerializer

from users.models import CustomUser, Feedback


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ["user_permissions", "groups", "last_login"]


class FeedbackSerializer(ModelSerializer):
    class Meta:
        model = Feedback
        fields = "__all__"
