from rest_framework import serializers
from .models import Book, Book_Genres, Login
from .models import User

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('User_Email', 'Password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('Email', 'Address', 'DOB', 'FName', 'LName', 'AdminFlag', 'CardNo')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('BookID', 'ReleaseYear', 'PageCount', 'Description', 'RentPrice', 
        'Title', 'SalePrice', 'Rating', 'Stock', 'Damage', 'LocationID', 'Image')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book_Genres
        fields = ('BookID', 'BookGenre')