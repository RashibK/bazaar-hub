from django.contrib import admin
from .models import Product, Category

class ProductAdmin(admin.ModelAdmin):
    pass


admin.site.register(Product, ProductAdmin)

class CategoryAdmin(admin.ModelAdmin):
    pass


admin.site.register(Category, CategoryAdmin)