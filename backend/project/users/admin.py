from django.contrib import admin

from users.form import UserAdmin
from users.models import User

# Register your models here.
admin.site.register(User, UserAdmin)