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


class Framework(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Vacancy(models.Model):
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.PositiveIntegerField()
    tags = models.ManyToManyField(Tag)
    languages = models.ManyToManyField(Language)
    frameworks = models.ManyToManyField(Framework, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.creator.username} - {self.title}"
