from django.contrib import admin
from job_seeker.models import FavoriteCategory, JobApplication

# Register your models here.

admin.site.register([FavoriteCategory, JobApplication])
