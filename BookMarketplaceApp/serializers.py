from rest_framework import serializers
from .models import Book, Book_Genres, InsurancePlan, Login, Payment, Publisher, Author, Purchase_Detail, Rental_Detail, Purchase_Detail, InsurancePlan, InsuranceProvider, Location, Review
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
        fields = ('Book_ID', 'BookGenre')

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ("Name",)

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ("AuthorID","FName","LName","NumBooks")

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ("CardNo","CVV","BillingAddress","NameOnCard","User_Email")

class RentalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental_Detail
        fields = ("User_Email","OrderID","StartDate","EndDate","RentAmt","BookID","Policy_no",'InsuranceProvider_Name','Quantity','CardNo',"OrderDate")
    
class PurchaseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase_Detail
        fields = ("User_Email","OrderID","PurchaseAmt","BookID","Policy_no","InsuranceProvider_Name","Quantity","OrderDate","CardNo")

class InsuranceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsuranceProvider
        fields = ("Name","Location_ID")

class InsurancePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePlan
        fields = ("PolicyNo","Price","CoverageDuration","Details","InsuranceProvider_Name")

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("LocationID","Country","City","StreetNum","PostalCode")
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("BookID", "User_Email", "Rating", "Comment","Review_ID")