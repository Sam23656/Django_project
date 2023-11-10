from django.contrib import admin

from users.form import UserAdmin
from users.models import CustomUser

# Register your models here.
admin.site.register(CustomUser, UserAdmin)
