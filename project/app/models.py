from django.db import models


# Create your models here.
class User(models.Model):
    Name = models.CharField(max_length=50)
    Sure_Name = models.CharField(max_length=50)
    Login = models.CharField(max_length=50)
    Password = models.CharField(max_length=50)
    Requirments = models.TextField(max_length=500)

    def __str__(self):
        return f"{self.Name} - {self.Sure_Name} - {self.Login} - {self.Password} - {self.Requirments}"

    def get_absolute_url(self):
        return f"/books/{self.Login}"


class Vacancie(models.Model):
    Name = models.CharField(max_length=50)
    Description = models.CharField(max_length=200)
    Requirments = models.TextField(max_length=500)
    Salary = models.IntegerField()

    def __str__(self):
        return f"{self.Name} - {self.Description} - {self.Requirments} - {self.Salary}"


class Review(models.Model):
    Description = models.CharField(max_length=200)
    Rating = models.IntegerField()
    User_Id = models.IntegerField()

    def __str__(self):
        return f"{self.Description} - {self.Rating} - {self.User_Id}"
