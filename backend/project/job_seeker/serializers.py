from rest_framework.serializers import ModelSerializer

from .models import Resume, JobApplication


class ResumeSerializer(ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'


class JobApplicationSerializer(ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'
