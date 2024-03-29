from rest_framework.serializers import ModelSerializer

from .models import Vacancy, Language, Tag, Framework


class VacancySerializer(ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'


class LanguageSerializer(ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class FrameworkSerializer(ModelSerializer):
    class Meta:
        model = Framework
        fields = '__all__'