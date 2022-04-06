from django.shortcuts import render
from .serializers import LoginSerializer, UserSerializer
from .models import Login
from .models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from BookMarketplaceApp import serializers
from rest_framework import status
import datetime

class LoginView(APIView):
    serializer_class = LoginSerializer

    def get_queryset(self):
        login = Login.objects.all()
        return login

    def get(self, request, *args, **kwargs):
        logins = self.get_queryset()
        serializer = LoginSerializer(logins, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        login_data = request.data
        
        logins = self.get_queryset()
        lserializer = LoginSerializer(logins, many=True)

        for val in lserializer.data:
            print(val)
            validLogin = 1
            for key, value in val.items():
                print(key, value)
                if (key == "Email"):
                    if (value != login_data['Email']):
                        validLogin = 0
                if (key == "Password"):
                    if (value != login_data['Password']):
                        validLogin = 0
            if (validLogin):
                return Response("", status=status.HTTP_201_CREATED)

        return Response("", status=status.HTTP_401_UNAUTHORIZED)
    

class SignupView(APIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = User.objects.all()
        return user

    def post(self, request, *args, **kwargs):
        signup_data = request.data

        # Don't add user if email is already used
        logins = Login.objects.all()
        lserializer = LoginSerializer(logins, many=True)
        for val in lserializer.data:
            for key, value in val.items():
                print(key, value)
                if (key == "User_Email"):
                    if (value == signup_data['Email']):
                        return Response("", status=status.HTTP_401_UNAUTHORIZED)

        # Add new login
        login_signup = Login(User_Email = signup_data['Email'], Password = signup_data['Password'])
        login_signup.save()

        # Add new user
        user_signup = User(Email = login_signup, FName = signup_data['FName'], LName = signup_data['LName'])
        user_signup.save()

        return Response("", status=status.HTTP_201_CREATED)




def BookMarketplaceApp(request):
    return render(request, 'BookMarketplaceApp.html', {})
