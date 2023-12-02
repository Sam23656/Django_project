from django.contrib import admin
from job_seeker.models import *

# Register your models here.

admin.site.register([FavoriteTag, JobApplication, Resume, FavoriteLanguage])
