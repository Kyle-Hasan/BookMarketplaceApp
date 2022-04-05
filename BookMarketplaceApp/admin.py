from django.contrib import admin
from .models import Login

class LoginAdmin(admin.ModelAdmin):
    list_display = ('LoginID', "Password")

admin.site.register(Login, LoginAdmin)