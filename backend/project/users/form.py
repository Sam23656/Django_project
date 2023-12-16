from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from .models import CustomUser


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = '__all__'

    def clean_password(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password1

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = CustomUser
        fields = '__all__'


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ('email', 'username', 'full_name', 'birthday', 'is_staff', 'is_superuser', 'role',
                    'company_name', 'industry')
    list_filter = ('is_staff',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'full_name', 'password', 'role')}),
        ('Personal info', {'fields': ('birthday', 'company_name', 'industry')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'username', 'full_name', 'birthday', 'password1', 'password2', 'is_staff',
                'is_superuser', 'is_active', 'role'
            ),
        }),
    )

    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()
