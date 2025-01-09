from django.contrib import admin
from .models import Cart

class CartAdmin(admin.ModelAdmin):
    pass


admin.site.register(Cart, CartAdmin)