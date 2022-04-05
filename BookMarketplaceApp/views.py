from django.shortcuts import render
from .serializers import LoginSerializer
from .models import Login
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from BookMarketplaceApp import serializers

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
        serializer = LoginSerializer(logins, many=True)

        for val in serializer.data:
            print(val)
            validLogin = 1
            for key, value in val.items():
                print(key, value)
                if (key == "LoginID"):
                    if (value != login_data['LoginID']):
                        validLogin = 0
                if (key == "Password"):
                    if (value != login_data['Password']):
                        validLogin = 0
            if (validLogin):
                return Response(201)

        return Response(401)
    

def BookMarketplaceApp(request):
    return render(request, 'BookMarketplaceApp.html', {})
