# Generated by Django 4.2.1 on 2023-05-14 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Description', models.CharField(max_length=200)),
                ('Rating', models.IntegerField()),
                ('User_Id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Sure_Name', models.CharField(max_length=50)),
                ('Login', models.CharField(max_length=50)),
                ('Password', models.CharField(max_length=50)),
                ('Requirments', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Vacancies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Description', models.CharField(max_length=200)),
                ('Requirments', models.TextField(max_length=500)),
                ('Salary', models.IntegerField()),
            ],
        ),
    ]
