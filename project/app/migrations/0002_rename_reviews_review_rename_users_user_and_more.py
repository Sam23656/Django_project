# Generated by Django 4.2.1 on 2023-05-14 15:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Reviews',
            new_name='Review',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
        migrations.RenameModel(
            old_name='Vacancies',
            new_name='Vacancie',
        ),
    ]
