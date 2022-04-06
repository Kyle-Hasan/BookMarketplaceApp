from django.contrib import admin
from .models import Login

class LoginAdmin(admin.ModelAdmin):
    list_display = ('User_Email', "Password")

admin.site.register(Login, LoginAdmin)