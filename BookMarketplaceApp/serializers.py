from rest_framework import serializers
from .models import Book, Book_Genres, Login, Publisher, Author
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
        'Title', 'SalePrice', 'Rating', 'Stock', 'Damage', 'LocationID', 'Image','Publisher_Name')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book_Genres
        fields = ('BookID', 'BookGenre')

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ("Name")

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ("AuthorID","FName","LName","NumBooks")