from django.shortcuts import render
from app.models import *


# Create your views here.
def get_index(request):
    return render(request, 'index.html')


def get_users(request):
    users = {"data1": User.objects.all()}

    return render(request, "Users.html", context=users)


def get_vacancie(request):
    vacancies = {"data1": Vacancie.objects.all()}

    return render(request, "Vacancie.html", context=vacancies)


def get_review(request):
    reviews = {"data1": Review.objects.all()}

    return render(request, "Review.html", context=reviews)
