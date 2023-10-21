from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.hashers import make_password


class UserManager(BaseUserManager):
    def create_user(self, email, username, full_name=None, birthday=None, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username')
        if not password:
            raise ValueError('Users must have a password')
        email = self.normalize_email(email)
        password = make_password(password)
        user = self.model(email=email, username=username, password=password, full_name=full_name, birthday=birthday)
        user.save()
        return user


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[username_validator],
    )
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    birthday = models.DateField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(
        max_length=20,
        choices=[
            ('admin', 'Admin'),
            ('employer', 'Employer'),
            ('job_seeker', 'Job Seeker'),
            ('moderator', 'Moderator'),
        ],
        default='job_seeker'
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    objects = UserManager()

    def __str__(self):
        return self.username
