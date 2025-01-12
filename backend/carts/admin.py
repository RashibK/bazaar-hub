from django.contrib import admin
from .models import Cart, CartItem

class CartAdmin(admin.ModelAdmin):
    pass


admin.site.register(Cart, CartAdmin)


class CartItemAdmin(admin.ModelAdmin):
    pass

admin.site.register(CartItem, CartItemAdmin)