# Generated by Django 4.2.6 on 2023-12-13 19:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancy',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='vacancy',
            name='frameworks',
            field=models.ManyToManyField(to='employee.framework'),
        ),
        migrations.AddField(
            model_name='vacancy',
            name='languages',
            field=models.ManyToManyField(to='employee.language'),
        ),
        migrations.AddField(
            model_name='vacancy',
            name='tags',
            field=models.ManyToManyField(to='employee.tag'),
        ),
    ]
