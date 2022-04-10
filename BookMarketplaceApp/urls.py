"""BookMarketplaceApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import urls
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from BookMarketplaceApp.views import LoginView, SignupView, UserView, WishlistUserView, BookView, GenreView, PublisherView, AuthorView, PaymentView, RentalDetailView, PurchaseDetailView, InsurancePlanView, InsuranceProviderView, LocationView, ReviewView, WritesView


router = routers.DefaultRouter()
#router.register('login/', LoginView.as_view())

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path('login/', LoginView.as_view()),
    path('signup/', SignupView.as_view()),
    path('user/', UserView.as_view()),
    path('wishlist/user/', WishlistUserView.as_view()),
    path('book/', BookView.as_view()),
    path('genre/book/', GenreView.as_view()),
    path('publisher/',PublisherView.as_view()),
    path('author/',AuthorView.as_view()),
    path('payment/', PaymentView.as_view()),
    path('rentaldetail/', RentalDetailView.as_view()),
    path('purchasedetail/', PurchaseDetailView.as_view()),
    path("insuranceplan/", InsurancePlanView.as_view()),
    path("insuranceprovider/", InsuranceProviderView.as_view()),
    path("location/",LocationView.as_view()),
    path("review/book/", ReviewView.as_view()),
    path("writes/", WritesView.as_view()),
    path("books/author/", WritesView.as_view())
]
