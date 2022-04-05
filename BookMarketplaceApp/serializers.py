from rest_framework import serializers
from .models import Login

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('LoginID', 'Password')

        def validate(self, attrs):
            return (5)

        def create(self, attrs):
            return (5)