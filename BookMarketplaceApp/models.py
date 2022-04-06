from django.db import models
from django.forms import CharField, EmailField

class Login(models.Model):
    User_Email = models.CharField(primary_key=True, max_length=50)
    Password = models.CharField(max_length=50)
    
    def _str_(self):
        return self.Email

class Payment(models.Model):
    CardNo = models.IntegerField(primary_key=True)
    CVV = models.IntegerField()
    BillingAddress = models.CharField(max_length=50)
    NameOnCard = models.CharField(max_length=50)
    User_Email = models.ForeignKey(Login, on_delete=models.CASCADE)

class Book(models.Model):
    BookID = models.IntegerField()
    ReleaseYear = models.IntegerField()
    PageCount = models.IntegerField()
    Description = models.CharField(max_length=200)
    RentPrice = models.IntegerField()
    Title = models.CharField(max_length=50)
    SalePrice = models.IntegerField()
    Rating = models.IntegerField()
    Stock = models.IntegerField()
    Damage = models.IntegerField()
    LocationID = models.IntegerField()
    Image = models.CharField(max_length=50)

class Location(models.Model):
    LocationID = models.IntegerField(primary_key=True)
    Country = models.CharField(max_length=20)
    City = models.CharField(max_length=20)
    StreetNum = models.IntegerField()
    PostalCode = models.CharField(max_length=6)

class InsuranceProvider(models.Model):
    #Insurance_Prov_ID = models.IntegerField(primary_key=True)
    Name = models.CharField(primary_key=True, max_length=50)
    Location_ID = models.ForeignKey(Location, on_delete=models.CASCADE)

class InsurancePlan(models.Model):
    PolicyNo = models.IntegerField(primary_key=True)
    Price = models.IntegerField()
    CoverageDuration = models.IntegerField()
    Details = models.CharField(max_length=100)
    InsuranceProvider_Name = models.ForeignKey(InsuranceProvider, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('PolicyNo', 'InsuranceProvider_Name')

class Order(models.Model):
    OrderID = models.IntegerField(primary_key=True)
    OrderDate = models.DateField()
    CardNo = models.ForeignKey(Payment, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(Login, on_delete=models.CASCADE)
    Book_ID = models.OneToOneField(Book, on_delete=models.CASCADE)
    Policy_no = models.OneToOneField(InsurancePlan, on_delete=models.CASCADE)
    Quantity = models.IntegerField()

class User(models.Model):
    Email = models.OneToOneField(Login, primary_key=True, on_delete=models.CASCADE)
    Address = models.CharField(max_length=50)
    DOB = models.DateField(null=True)
    FName = models.CharField(max_length=50)
    LName = models.CharField(max_length=50)
    AdminFlag = models.BooleanField(default=False)
    CardNo = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True)

class Author(models.Model):
    AuthorID = models.IntegerField(primary_key=True)
    NumBooks = models.IntegerField()
    DateDied = models.DateField()
    FName = CharField(max_length=50)
    LName = CharField(max_length=50)

class Publisher(models.Model):
    # PublisherID = models.IntegerField(primary_key=True)
    Name = models.CharField(primary_key=True, max_length=50)

class Rental_Detail(models.Model):
    OrderID = models.IntegerField(primary_key=True)
    StartDate = models.DateField()
    EndDate = models.DateField()
    RentAmt = models.IntegerField()

class Purchase_Detail(models.Model):
    OrderID = models.IntegerField(primary_key=True)
    PurchaseAmt = models.IntegerField()

class Review(models.Model):
    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(User, on_delete=models.CASCADE)
    Rating = models.IntegerField()
    Comment = models.CharField(max_length=100)

#class Assigned_to_order(models.Model):
#    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
#    Order_ID = models.OneToOneField(Order, on_delete=models.CASCADE)
#    Policy_no = models.OneToOneField(InsurancePlan, on_delete=models.CASCADE)
#    Quantity = models.IntegerField()
   # InsuranceProvider_ID = models.ForeignKey(InsurancePlan, on_delete=models.SET_NULL, null=True)

class Publishes(models.Model):
    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
    Publisher_Name = models.OneToOneField(Publisher, on_delete=models.CASCADE)

class Writes(models.Model):
    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
    Author_ID = models.OneToOneField(Author, on_delete=models.CASCADE)

class Wants(models.Model):
    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
    User_Email = models.OneToOneField(Login, on_delete=models.CASCADE)

class Book_Genres(models.Model):
    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
    BookGenre = models.CharField(max_length=20, unique=True)