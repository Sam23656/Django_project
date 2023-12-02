from django.db import models

from users.models import CustomUser
# Create your models here.

from django.db import models
from users.models import CustomUser


class Tag(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Language(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Vacancy(models.Model):
    employer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.PositiveIntegerField()
    tags = models.ManyToManyField(Tag)
    languages = models.ManyToManyField(Language)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employer.username} - {self.title}"
