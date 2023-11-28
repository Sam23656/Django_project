from django.db import models


# Create your models here.

class Tag(models.Model):
    title = models.CharField(max_length=255)


class Category(models.Model):
    title = models.CharField(max_length=255)


class Vacancy(models.Model):
    employer = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.PositiveIntegerField()
    tags = models.ManyToManyField(Tag)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
