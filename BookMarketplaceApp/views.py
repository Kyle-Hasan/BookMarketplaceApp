from django.shortcuts import render
from .serializers import BookSerializer, LoginSerializer, UserSerializer, PublisherSerializer, GenreSerializer, AuthorSerializer, PaymentSerializer, RentalDetailSerializer, PurchaseDetailSerializer, InsurancePlanSerializer, InsuranceProviderSerializer, LocationSerializer, ReviewSerializer
from .models import InsuranceProvider, Location, Login, Payment, Publisher, User, Wants, Book, Book_Genres, Author, Rental_Detail, Purchase_Detail, InsurancePlan, InsuranceProvider, Location, Review, Writes
from rest_framework.views import APIView
from rest_framework.response import Response
from BookMarketplaceApp import serializers
from rest_framework import status
from datetime import datetime
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
        print(request.data)
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
        print(request.data)
        patch_data = request.data
        user_to_update = User.objects.get(Email=patch_data['Email'])

        user_to_update.Address = patch_data['Address']
        user_to_update.DOB = patch_data['DOB']
        user_to_update.FName = patch_data['FName']
        user_to_update.LName = patch_data['LName']
        user_to_update.AdminFlag = patch_data['AdminFlag']
        #user_to_update.CardNo = patch_data['CardNo'] # Has to be assigned to payment that has already been made
        user_to_update.save()
        serializer = UserSerializer(user_to_update,many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # get user info
    def get(self, request, *args, **kwargs):
        User_Email = request.GET["User_Email"]
        user_to_return = User.objects.get(Email=User_Email)
        serializer = UserSerializer(user_to_return,many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)



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
        #print(request.GET)
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
        print(request.data)
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
            Description = book_data['Description'],
            Image=book_data['Image'],
            Publisher_Name=p2,
        )

        new_book.save()
        return Response(new_book.BookID, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        if request.GET:
            book_id = request.GET['BookID']
            book_data = request.data
            p2 = Publisher.objects.get(Name=book_data['Publisher_Name'])
            b = Book.objects.get(BookID=book_id)
            b.ReleaseYear=book_data['ReleaseYear']
            b.PageCount=book_data['PageCount']
            b.RentPrice=book_data['RentPrice']
            b.Description = book_data['Description']
            b.Title=book_data['Title']
            b.SalePrice=book_data['SalePrice']
            b.Rating=book_data['Rating']
            b.Stock=book_data['Stock']
            b.Damage=book_data['Damage']
            b.LocationID=book_data['LocationID']
            b.Image=book_data['Image']
            b.Publisher_Name=p2
            b.save()
            serializer = BookSerializer(b, many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        

        else:
            return Response("",status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request,*args,**kwargs):
        book_id = request.GET['BookID']
        b = Book.objects.get(BookID=book_id)
        b.delete()
        return Response("", status=status.HTTP_200_OK)
        

class GenreView(APIView):
    serializer_class = GenreSerializer
    # add genre to book
    def post(self, request, *args, **kwargs):
        
        book_id = request.data['BookID']
        book_genre = request.data['BookGenre']
            
        book = Book.objects.get(BookID=book_id)
        new_genre = Book_Genres(Book_ID=book, BookGenre=book_genre)
        new_genre.save()

        return Response("", status=status.HTTP_200_OK)

    # returns genres of book
    def get(self, request, *args, **kwargs):
        genres = []
        if request.GET:
            print("hello")
            print(request.GET)
            book_id = request.GET['BookID']
            print(book_id)
            print(Book_Genres.objects.all())
            book_genres = Book_Genres.objects.all().filter(Book_ID=book_id)
            
            print(book_genres)
            for val in book_genres:
                print(val)
                genres.append(val.BookGenre)
        
        return Response(genres, status=status.HTTP_200_OK)
    #delete genre
    def delete(self,request,*args,**kwargs):
        print(request.GET)
        g = Book_Genres.objects.get(Book_ID=request.GET['BookID'],BookGenre=request.GET['BookGenre'])
        g.delete()
        return Response("", status=status.HTTP_200_OK)

    
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
    def get(self,request,*args,**kwargs):

        # get all books published by publisher
        if "Publisher_Name" in request.GET:
            publishers = []
            books = Book.objects.filter(Publisher_Name=request.GET['Publisher_Name'])
            for b in books:
                book = {
                    "BookID": b.BookID,
                    "Title": b.Title,
                    "Rating": b.Rating,
                    "Image": b.Image,
                    'SalePrice': b.SalePrice,
                    'RentPrice': b.RentPrice,
                    'Stock': b.Stock
                }
                publishers.append(book)
            return Response(publishers, status=status.HTTP_200_OK)
        # get all publishes
        else:
            all_publishers = Publisher.objects.all()
            serializer = PublisherSerializer(all_publishers,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

class AuthorView(APIView):
    serializer_class = AuthorSerializer
    def post(self,request,*args,**kwargs):
        print(request)
        author_data = request.data
        
        print(author_data)
        a = Author(
            FName = author_data['FName'],
           LName = author_data['LName'],
            NumBooks = author_data['NumBooks'],
           
        )
        a.save()
        serializer = AuthorSerializer(a,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        
        if "FName" in request.GET and "LName" in request.GET:
            auts = Author.objects.filter(FName=request.GET['FName'], LName = request.GET['LName'])

            authors = []
            for a in auts:
                serializer = AuthorSerializer(a, many=True)
                authors.append(serializer.data)
                 
            return Response(authors, status=status.HTTP_200_OK)

        elif "AuthorID" in request.GET:
            author = Author.objects.get(AuthorID=request.get["AuthorID"])
            serializer = AuthorSerializer(author,many=False)

           
                 
            return Response(serializer.data, status=status.HTTP_200_OK)


        else:
            authors = Author.objects.filter()
            serializer = AuthorSerializer(authors,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class WritesView(APIView):
    def post(self, request, *args, **kwargs):
        writes_data = request.data
        print("hello ")
        print(writes_data)
        book = Book.objects.get(BookID=writes_data['BookID'])
        author = Author.objects.get(AuthorID=writes_data['AuthorID'])
        new_writes = Writes(Book_ID=book, Author_ID=author)
        new_writes.save()
        return Response("Author assigned to book", status=status.HTTP_200_OK)

    # get all books for an author
    def get(self, request, *args, **kwargs):
        if "AuthorID" in request.GET:
            writes = Writes.objects.filter(Author_ID=request.GET['AuthorID'])

            books = []
            for w in writes:
                serializer = BookSerializer(w.Book_ID, many=False)
                book = {
                    "BookID": serializer.data['BookID'], 
                    "Title": serializer.data['Title'],
                    "Rating": serializer.data['Rating'],
                    "Image": serializer.data['Image'],
                    'SalePrice': serializer.data['SalePrice'],
                    'RentPrice': serializer.data['RentPrice'],
                    'Stock': serializer.data['Stock']
                    
                    }
                books.append(book)

            return Response(books, status=status.HTTP_200_OK)
        elif "BookID" in request.GET:
            a = Writes.objects.filter(Book_ID = request.GET['BookID'])
            authors = []
            print("hello")
            print(a)
            for author in a:
                print(author)
                serializer = AuthorSerializer(author.Author_ID ,many=False)
                a1 = {
                    "FName": serializer.data['FName'],
                    "LName": serializer.data['LName'],
                    'AuthorID': serializer.data['AuthorID']
                }
                authors.append(a1)
            return Response(authors,status=status.HTTP_200_OK)
        else:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        toBeDeleted = Writes.objects.filter(Book_ID=request.GET["BookID"],Author_ID=request.GET['AuthorID'])
        for t in toBeDeleted:
            t.delete()
        return Response("deleted",status=status.HTTP_200_OK)


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
        print(request.GET)
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
        p2 = Payment.objects.get(CardNo=request.data['CardNo'])
        f = Login.objects.get(User_Email=request.data['User_Email'])
        b = Book.objects.get(BookID=request.data['Book_ID'])
        i = InsurancePlan.objects.get(PolicyNo=request.data['PolicyNo'],InsuranceProvider_Name=request.data['InsuranceProvider_Name'])
        print(rental_data)
        
        r = Rental_Detail(
            BookID = b,
            User_Email=f,
            CardNo = p2,
            StartDate = rental_data['StartDate'],
            EndDate = rental_data['EndDate'],
            RentAmt = rental_data['RentAmt'],
            Policy_no = i,
            InsuranceProvider_Name = request.data['InsuranceProvider_Name'],
            Quantity = request.data["Quantity"],
            OrderDate = request.data['OrderDate']
           
            
        )
        b.Stock = max(b.Stock-int(request.data["Quantity"]),0)
        b.save()
        r.save()
        serializer = RentalDetailSerializer(r,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get rental detail by order ID
        print("hello")
        print(request.GET)
        if "OrderID" in request.GET:
            rental_to_return = Rental_Detail.objects.get(OrderID=request.GET['OrderID'])
            serializer = RentalDetailSerializer(rental_to_return, many=False)

        elif "User_Email" in request.GET:
            rental_to_return = Rental_Detail.objects.filter(User_Email=request.GET['User_Email'])
            serializer = RentalDetailSerializer(rental_to_return, many=True)
            
        else:
            rentals = Rental_Detail.objects.all()
            serializer = RentalDetailSerializer(rentals,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



class PurchaseDetailView(APIView):
    serializer_class = PurchaseDetailSerializer

    def post(self,request,*args,**kwargs):
        print("hih")
        print(request.data)
        purchase_data = request.data
        p2 = Payment.objects.get(CardNo=request.data['CardNo'])
        f = Login.objects.get(User_Email=request.data['User_Email'])
        b = Book.objects.get(BookID=request.data['Book_ID'])
        i = InsurancePlan.objects.get(PolicyNo=request.data['PolicyNo'],InsuranceProvider_Name=request.data['InsuranceProvider_Name'])
        print(purchase_data)
       
        r = Purchase_Detail(
            PurchaseAmt = purchase_data['PurchaseAmt'],
            User_Email = f,
            CardNo = p2,
            InsuranceProvider_Name = request.data['InsuranceProvider_Name'],
            BookID = b,
            Policy_no = i,
            Quantity = request.data["Quantity"],
            OrderDate = request.data['OrderDate']
            
            
        )
        b.Stock = max(b.Stock-int(request.data["Quantity"]),0)
        b.save()
        r.save()
        serializer = PurchaseDetailSerializer(r,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get purchase detail by order ID
        print(request.GET)
        if "OrderID" in request.GET:
            purchase_to_return = Purchase_Detail.objects.get(OrderID=request.GET['OrderID'])
            serializer = PurchaseDetailSerializer(purchase_to_return, many=False)
        elif "User_Email" in request.GET:
            purchase_to_return = Purchase_Detail.objects.filter(User_Email=request.GET['User_Email'])
            serializer = PurchaseDetailSerializer(purchase_to_return, many=True)
        else:
            purchases = Purchase_Detail.objects.all()
            serializer = PurchaseDetailSerializer(purchases,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class LocationView(APIView):
    serializer_class = LocationSerializer

    def post(self,request,*args,**kwargs):
        print(request)
        location_data = request.data

        print(location_data)
        l = Location(
           # LocationID = location_data['LocationID'],
            Country = location_data['Country'],
            City = location_data['City'],
            StreetNum = location_data['StreetNum'],
            PostalCode = location_data['PostalCode']
        )
        l.save()
        serializer = LocationSerializer(l,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        locations = Location.objects.all()
        serializer = LocationSerializer(locations,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class InsuranceProviderView(APIView):
    serializer_class = InsuranceProviderSerializer
    def post(self,request,*args,**kwargs):
        print(request)
        insuranceProvider_data = request.data
        
        print(insuranceProvider_data)
        p1 = insuranceProvider_data['Location_ID']
        p2 = Location.objects.get(LocationID=p1)
        p = InsuranceProvider(
            Name = insuranceProvider_data['Name'],
            Location_ID = p2
        )
        p.save()
        serializer = InsuranceProviderSerializer(p,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get Insurance Provider by name
        if "Name" in request.GET:
            insuranceProvider_to_return = InsuranceProvider.objects.get(Name=request.GET['Name'])
            serializer = InsuranceProviderSerializer(insuranceProvider_to_return, many=False)
        
        else:
            insuranceProviders = InsuranceProvider.objects.all()
            serializer = InsuranceProviderSerializer(insuranceProviders,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class InsurancePlanView(APIView):
    serializer_class = InsurancePlanSerializer
    def post(self,request,*args,**kwargs):
        print(request)
        insurancePlan_data = request.data
        
        print(insurancePlan_data)
        p1 = insurancePlan_data['InsuranceProvider_name']
        p2 = InsuranceProvider.objects.get(Name=p1)
        p = InsurancePlan(
            PolicyNo = insurancePlan_data['PolicyNo'],
            Price = insurancePlan_data['Price'],
            CoverageDuration = insurancePlan_data['CoverageDuration'],
            Details = insurancePlan_data['Details'],
            InsuranceProvider_Name = p2
        )
        p.save()
        serializer = InsurancePlanSerializer(p,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self,request,*args,**kwargs):
        #get insurance plan by policy no
        if "PolicyNo" in request.GET:
            insurancePlan_to_return = InsurancePlan.objects.get(PolicyNo=request.GET['PolicyNo'])
            serializer = InsurancePlanSerializer(insurancePlan_to_return, many=False)
        
        else:
            insurancePlans = InsurancePlan.objects.all()
            serializer = InsurancePlanSerializer(insurancePlans,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ReviewView(APIView):
    serializer_class = ReviewSerializer

    def get(self, request, *args, **kwargs):
        if request.GET:
            reviews = Review.objects.filter(BookID=request.GET['BookID'])
            num_of_reviews = Review.objects.filter(BookID=request.GET['BookID']).count()
            #print(num_of_reviews)
            serializer = ReviewSerializer(reviews, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        review_data = request.data
        book = Book.objects.get(BookID=review_data['BookID'])
        user = User.objects.get(Email=review_data['User_Email'])

        new_review = Review(BookID=book, User_Email=user, Rating=review_data['Rating'], Comment=review_data['Comment'])
        new_review.save()
        serializer = ReviewSerializer(new_review, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # delete review
    def delete(self, request, *args, **kwargs):
        if "BookID" in request.GET and "User_Email" in request.GET:
            review = Review.objects.get(BookID=request.GET['BookID'], User_Email=request.GET['User_Email'])
            review.delete()

            return Response("", status=status.HTTP_200_OK)
        
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    # edit review
    def patch(self, request, *args, **kwargs):
        print(request.data)
        if("BookID" in request.data and "User_Email" in request.data and "Comment" in request.data and "Rating" in request.data):
            BookID = request.data['BookID']
            User_Email = request.data['User_Email']
            Rating = request.data['Rating']
            Comment = request.data['Comment']
            review = Review.objects.get(BookID=BookID,User_Email=User_Email)
            review.Comment = Comment
            review.Rating = Rating
            review.save()
            return Response("", status=status.HTTP_200_OK)
        return Response("", status=status.HTTP_400_BAD_REQUEST)
        



def BookMarketplaceApp(request):
    return render(request, 'BookMarketplaceApp.html', {})
