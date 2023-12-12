# Generated by Django 4.2.6 on 2023-12-12 17:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employee', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('job_seeker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User'),
        ),
        migrations.AddField(
            model_name='resume',
            name='languages',
            field=models.ManyToManyField(to='employee.language', verbose_name='Languages'),
        ),
        migrations.AddField(
            model_name='resume',
            name='skills',
            field=models.ManyToManyField(to='employee.tag', verbose_name='Skills'),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='vacancy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.vacancy'),
        ),
    ]
