from django.db import models
from users.models import CustomUser
from employee.models import Language, Tag, Vacancy


# Create your models here.


class Resume(models.Model):
    job_seeker = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='User')
    experience = models.TextField(blank=True, null=True, verbose_name='Work Experience')
    education = models.TextField(blank=True, null=True, verbose_name='Education')
    skills = models.ManyToManyField(Tag, verbose_name='Skills')
    languages = models.ManyToManyField(Language, verbose_name='Languages')
    social_links = models.TextField(blank=True, null=True, verbose_name='Social Links')
    additional_info = models.TextField(blank=True, null=True, verbose_name='Additional Information')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')

    def __str__(self):
        return f"{self.job_seeker.username} - {self.id}"


class FavoriteLanguage(models.Model):
    job_seeker = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    languages = models.ForeignKey(Language, on_delete=models.CASCADE)


class FavoriteTag(models.Model):
    job_seeker = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)


class JobApplication(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    job_seeker = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)




