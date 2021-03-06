from asyncio.windows_events import NULL
import datetime
from email.policy import default
from django.db import models
from django.forms import CharField, EmailField
from django.utils import timezone
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





class InsuranceProvider(models.Model):
    #Insurance_Prov_ID = models.IntegerField(primary_key=True)
    Name = models.CharField(primary_key=True, max_length=50)
    
    

class InsurancePlan(models.Model):
    PolicyNo = models.IntegerField(primary_key=True)
    Price = models.FloatField()
    CoverageDuration = models.IntegerField()
    Details = models.CharField(max_length=100)
    InsuranceProvider_Name = models.ForeignKey(InsuranceProvider, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('PolicyNo', 'InsuranceProvider_Name')



class User(models.Model):
    Email = models.OneToOneField(Login, primary_key=True, on_delete=models.CASCADE)
    Address = models.CharField(max_length=50)
    DOB = models.DateField(null=True)
    FName = models.CharField(max_length=50)
    LName = models.CharField(max_length=50)
    AdminFlag = models.BooleanField(default=False)
    CardNo = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True)

class Author(models.Model):
    AuthorID = models.AutoField(primary_key=True)
    NumBooks = models.IntegerField()
    
    FName = models.CharField(max_length=50,default="")
    LName = models.CharField(max_length=50,default="")

class Publisher(models.Model):
    # PublisherID = models.IntegerField(primary_key=True)
    Name = models.CharField(primary_key=True, max_length=50)

class Book(models.Model):
    BookID = models.AutoField(primary_key=True)
    ReleaseYear = models.IntegerField()
    PageCount = models.IntegerField()
    Description = models.CharField(max_length=200)
    RentPrice = models.FloatField(null=True)
    Title = models.CharField(max_length=50)
    SalePrice = models.FloatField(null=True)
    Rating = models.IntegerField()
    Stock = models.IntegerField()
    Damage = models.CharField(max_length=50)
   # LocationID = models.ForeignKey(Location, on_delete=models.CASCADE,null=True,default=NULL)
    
    Image = models.CharField(max_length=50, null=True)
    Publisher_Name = models.ForeignKey(Publisher, on_delete=models.CASCADE,null=True,default=NULL)

'''class Order(models.Model):
    OrderID = models.AutoField(primary_key=True)
    OrderDate = models.DateField()
    CardNo = models.ForeignKey(Payment, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(Login, on_delete=models.CASCADE)
    Book_ID = models.OneToOneField(Book, on_delete=models.CASCADE)
    Policy_no = models.OneToOneField(InsurancePlan, on_delete=models.CASCADE)
    Quantity = models.IntegerField()'''

class Rental_Detail(models.Model):
    OrderID = models.AutoField(primary_key=True)
    OrderDate = models.DateField()
    CardNo = models.ForeignKey(Payment, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(Login, on_delete=models.CASCADE)
    BookID = models.ForeignKey(Book, on_delete=models.CASCADE)
    Policy_no = models.ForeignKey(InsurancePlan, on_delete=models.CASCADE)
    Quantity = models.IntegerField()
    StartDate = models.DateField()
    EndDate = models.DateField()
    RentAmt = models.FloatField()
    InsuranceProvider_Name = models.CharField(max_length=50)

class Purchase_Detail(models.Model):
    OrderID = models.AutoField(primary_key=True)
    OrderDate = models.DateField()
    CardNo = models.ForeignKey(Payment, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(Login, on_delete=models.CASCADE)
    BookID = models.ForeignKey(Book, on_delete=models.CASCADE)
    Policy_no = models.ForeignKey(InsurancePlan, on_delete=models.CASCADE)
    Quantity = models.IntegerField()
    PurchaseAmt = models.FloatField()
    InsuranceProvider_Name = models.CharField(max_length=50)

class Review(models.Model):
    Review_ID = models.AutoField(primary_key=True)
    BookID = models.ForeignKey(Book, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(User, on_delete=models.CASCADE)
    Rating = models.IntegerField()
    Comment = models.CharField(max_length=100)
    class Meta:
        unique_together = ('BookID', 'User_Email')

#class Assigned_to_order(models.Model):
#    Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
#    Order_ID = models.OneToOneField(Order, on_delete=models.CASCADE)
#    Policy_no = models.OneToOneField(InsurancePlan, on_delete=models.CASCADE)
#    Quantity = models.IntegerField()
   # InsuranceProvider_ID = models.ForeignKey(InsurancePlan, on_delete=models.SET_NULL, null=True)

#class Publishes(models.Model):
    #Book_ID = models.OneToOneField(Book, primary_key=True, on_delete=models.CASCADE)
   # Publisher_Name = models.OneToOneField(Publisher, on_delete=models.CASCADE)

class Writes(models.Model):
    Writes_ID = models.AutoField(primary_key=True)
    Book_ID = models.ForeignKey(Book, on_delete=models.CASCADE)
    Author_ID = models.ForeignKey(Author, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('Book_ID', 'Author_ID')

class Wants(models.Model):
    Wants_ID = models.AutoField(primary_key=True)
    Book_ID = models.ForeignKey(Book, on_delete=models.CASCADE)
    User_Email = models.ForeignKey(Login, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('Book_ID', 'User_Email')

class Book_Genres(models.Model):
    Genre_ID = models.AutoField(primary_key=True)
    Book_ID = models.ForeignKey(Book, null=True, on_delete=models.CASCADE)
    BookGenre = models.CharField(max_length=20)
    class Meta:
        unique_together = ('Book_ID', 'BookGenre')

