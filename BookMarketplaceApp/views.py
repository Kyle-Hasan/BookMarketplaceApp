from pickle import FALSE
from django.shortcuts import render
from .serializers import BookSerializer, LoginSerializer, UserSerializer, PublisherSerializer, GenreSerializer, AuthorSerializer, PaymentSerializer, RentalDetailSerializer, PurchaseDetailSerializer
from .models import Login, Payment, Publisher, User, Wants, Book, Book_Genres, Author, Rental_Detail, Purchase_Detail
from rest_framework.views import APIView
from rest_framework.response import Response
from BookMarketplaceApp import serializers
from rest_framework import status

class LoginView(APIView):
    serializer_class = LoginSerializer

    def get_queryset(self):
        login = Login.objects.all()
        return login

    # returns all logins
    def get(self, request, *args, **kwargs):
        logins = self.get_queryset()
        serializer = LoginSerializer(logins, many=True)
        return Response(serializer.data)

    # adds the login to the database that was passed in data
    def add(data):
        data.save()

    # returns 201 if valid login. 404 if not
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
                user = User.objects.get(Email=login_data['Email'])
                return Response(user.AdminFlag, status=status.HTTP_201_CREATED)

        return Response("", status=status.HTTP_404_NOT_FOUND)
    
class SignupView(APIView):
    serializer_class = UserSerializer

        # Adds a user and a login for that user
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
        LoginView.add(login_signup)

        # Add new user
        user_signup = User(Email = login_signup, FName = signup_data['FName'], 
        LName = signup_data['LName'], AdminFlag = signup_data['AdminFlag'])
        user_signup.save()

        return Response(user_signup.AdminFlag, status=status.HTTP_201_CREATED)

class UserView(APIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = User.objects.all()
        return user

    # returns user info for email in request
    def post(self, request, *args, **kwargs):
        get_data = request.data

        users = self.get_queryset()
        serializer = UserSerializer(users, many=True)
        for val in serializer.data:
            for key, value in val.items():
                if (key == "Email"):
                    if (value == get_data['Email']):
                        return Response(val, status=status.HTTP_200_OK)

        return Response("", status=status.HTTP_400_BAD_REQUEST)

    # edit user info
    def patch(self, request):
        patch_data = request.data
        user_to_update = User.objects.get(Email=patch_data['Email'])

        user_to_update.Address = patch_data['Address']
        user_to_update.DOB = patch_data['DOB']
        user_to_update.FName = patch_data['FName']
        user_to_update.LName = patch_data['LName']
        user_to_update.AdminFlag = patch_data['AdminFlag']
        #user_to_update.CardNo = patch_data['CardNo'] # Has to be assigned to payment that has already been made
        user_to_update.save()

        return Response("", status=status.HTTP_200_OK)


class WishlistUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.GET
        wishlist_data = request.data
        print(user_id)
        print(wishlist_data)

        book_to_add = Book.objects.get(BookID=wishlist_data['BookID'])
        login = Login.objects.get(User_Email=user_id['Email'])
        new_wishlist = Wants(Book_ID=book_to_add, User_Email=login)
        new_wishlist.save()

        return Response("", status=status.HTTP_200_OK)

class BookView(APIView):
    serializer_class = BookSerializer

    # returns one or all the books
    def get(self, request, *args, **kwargs):
        print(request.GET)
        # if request.GET is not empty return 1 book specified by request.GET
        if request.GET:
            book_id = request.GET
            book_to_return = Book.objects.get(BookID=book_id['BookID'])
            serializer = BookSerializer(book_to_return, many=False)
        # if request.GET is empty return all books
        else:
            books_to_return = Book.objects.all()
            serializer = BookSerializer(books_to_return, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # add a new book to the database
    def post(self, request, *args, **kwargs):
        book_data = request.data
        p = book_data['Publisher_Name']
        p2 = Publisher.objects.get(Name=p)
        new_book = Book(
            #BookID=book_data['BookID'],
            ReleaseYear=book_data['ReleaseYear'],
            PageCount=book_data['PageCount'],
            RentPrice=book_data['RentPrice'],
            Title=book_data['Title'],
            SalePrice=book_data['SalePrice'],
            Rating=book_data['Rating'],
            Stock=book_data['Stock'],
            Damage=book_data['Damage'],
            LocationID=book_data['LocationID'],
            Image=book_data['Image'],
            Publisher_Name=p2,
        )

        new_book.save()
        return Response(new_book.BookID, status=status.HTTP_201_CREATED)

class GenreView(APIView):
    serializer_class = GenreSerializer
    # add genre to book
    def post(self, request, *args, **kwargs):
        
        book_id = request.data['BookID']
        book_genre = request.data['Book_Genre']
            
        book = Book.objects.get(BookID=book_id)
        new_genre = Book_Genres(Book_ID=book, BookGenre=book_genre)
        new_genre.save()

        return Response("", status=status.HTTP_200_OK)

    # returns genres of book
    def get(self, request, *args, **kwargs):
        if request.GET:
            book_id = request.GET['BookID']
            print(book_id)
            print(Book_Genres.objects.all())
            book_genres = Book_Genres.objects.all().filter(Book_ID=book_id)
            genres = []
            print(book_genres)
            for val in book_genres:
                print(val)
                genres.append(val.BookGenre)
        
        return Response(genres, status=status.HTTP_200_OK)
    
class PublisherView(APIView):
    serializer_class = PublisherSerializer
    #add publisher
    def post(self, request, *args, **kwargs):
        publiser_data=  request.data
        name = publiser_data["Name"]
        p = Publisher(
            Name=name
        )
        p.save()
        return Response(p.Name, status=status.HTTP_201_CREATED)

class AuthorView(APIView):
    serializer_class = AuthorSerializer
    def post(self,request,*args,**kwargs):
        print(request)
        author_data = request.data
        
        print(author_data)
        a = Author(
            FName = author_data['FName'],
           LName = author_data['LName'],
            NumBooks = author_data['NumBooks']
        )
        a.save()
        serializer = AuthorSerializer(a,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get author by ID
        if "AuthorID" in request.GET:
            author_to_return = Author.objects.get(BookID=request.GET['BookID'])
            serializer = AuthorSerializer(author_to_return, many=False)
        
        else:
            authors = Author.objects.all()
            serializer = AuthorSerializer(authors,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PaymentView(APIView):
    serializer_class = PaymentSerializer
    def post(self,request,*args,**kwargs):
        print(request)
        payment_data = request.data
        
        print(payment_data)
        p1 = payment_data['User_Email']
        p2 = Login.objects.get(User_Email=p1)
        p = Payment(
            CardNo = payment_data['CardNo'],
            CVV = payment_data['CVV'],
            BillingAddress = payment_data['BillingAddress'],
            User_Email = p2
        )
        p.save()
        serializer = PaymentSerializer(p,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get payment by user email
        if "User_Email" in request.GET:
            payment_to_return = Payment.objects.get(User_Email=request.GET['User_Email'])
            serializer = PaymentSerializer(payment_to_return, many=False)
        
        else:
            payments = Payment.objects.all()
            serializer = PaymentSerializer(payments,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class RentalDetailView(APIView):
    serializer_class = RentalDetailSerializer

    def post(self,request,*args,**kwargs):
        print(request)
        rental_data = request.data
        
        print(rental_data)
        r = Rental_Detail(
            OrderID = rental_data['OrderID'],
            StartDate = rental_data['StartDate'],
            EndDate = rental_data['EndDate'],
            RentAmt = rental_data['RentAmt']
        )
        r.save()
        serializer = RentalDetailSerializer(r,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get rental detail by order ID
        if "OrderID" in request.GET:
            rental_to_return = Rental_Detail.objects.get(OrderID=request.GET['OrderID'])
            serializer = RentalDetailSerializer(rental_to_return, many=False)
        else:
            rentals = Rental_Detail.objects.all()
            serializer = RentalDetailSerializer(rentals,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class PurchaseDetailView(APIView):
    serializer_class = PurchaseDetailSerializer

    def post(self,request,*args,**kwargs):
        print(request)
        purchase_data = request.data
        
        print(purchase_data)
        r = Purchase_Detail(
            OrderID = purchase_data['OrderID'],
            PurchaseAmt = purchase_data['PurchaseAmt']
        )
        r.save()
        serializer = PurchaseDetailSerializer(r,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get purchase detail by order ID
        if "OrderID" in request.GET:
            purchase_to_return = Purchase_Detail.objects.get(OrderID=request.GET['OrderID'])
            serializer = RentalDetailSerializer(purchase_to_return, many=False)
        else:
            purchases = Purchase_Detail.objects.all()
            serializer = PurchaseDetailSerializer(purchases,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


def BookMarketplaceApp(request):
    return render(request, 'BookMarketplaceApp.html', {})
