from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, full_name=None, birthday=None, password=None, role='job_seeker'):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username')
        if not password:
            raise ValueError('Users must have a password')

        email = self.normalize_email(email)
        user = get_user_model()(
            email=email,
            username=username,
            password=make_password(password),
            full_name=full_name,
            birthday=birthday,
            role=role
        )
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, full_name=None, birthday=None, password=None, role='admin'):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username')
        if not password:
            raise ValueError('Users must have a password')

        email = self.normalize_email(email)
        user = get_user_model()(
            email=email,
            username=username,
            password=make_password(password),
            full_name=full_name,
            birthday=birthday,
            role=role,
            is_staff=True,
            is_superuser=True
        )
        user.save(using=self._db)
        return user


# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
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
    is_superuser = models.BooleanField(default=False)
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

    objects = CustomUserManager()

    def __str__(self):
        return self.username
