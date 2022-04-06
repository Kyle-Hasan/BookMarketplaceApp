from rest_framework import serializers
from .models import Login
from .models import User

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('User_Email', 'Password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('Email', 'Address', 'DOB', 'FName', 'LName', 'AdminFlag', 'CardNo')

