from django.contrib import admin

from users.form import UserAdmin
from users.models import CustomUser, Feedback

# Register your models here.
admin.site.register(CustomUser, UserAdmin)
admin.site.register(Feedback)
