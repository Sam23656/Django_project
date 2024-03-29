# Generated by Django 4.2.6 on 2023-12-13 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experience', models.TextField(blank=True, null=True, verbose_name='Work Experience')),
                ('education', models.TextField(blank=True, null=True, verbose_name='Education')),
                ('social_links', models.TextField(blank=True, null=True, verbose_name='Social Links')),
                ('additional_info', models.TextField(blank=True, null=True, verbose_name='Additional Information')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
            ],
        ),
    ]
