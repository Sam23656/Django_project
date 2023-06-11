from django.shortcuts import render
from app.models import *


# Create your views here.
def get_index(request):
    return render(request, 'index.html', context={"Vacansies": get_vacancies})


def get_vacancies(request):
    vacancies = {"data1": Vacancie.objects.all()}

    return render(request, "Vacancies.html", context=vacancies)


def get_review(request):
    reviews = {"data1": Review.objects.all()}

    return render(request, "Reviews.html", context=reviews)


def show_user_page(request, user):
    return render(request, "User.html", context={"user": User.objects.get(Login=user)})


def show_vacancie_page(request, vacancie):
    return render(request, "Vacancie.html", context={"Vacancie": Vacancie.objects.get(Name=vacancie)})


def show_review_page(request, review):
    return render(request, "Review.html", context={"review": Review.objects.get(User_Id=review)})
