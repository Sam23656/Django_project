from rest_framework.serializers import ModelSerializer

from .models import Resume


class ResumeSerializer(ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'
