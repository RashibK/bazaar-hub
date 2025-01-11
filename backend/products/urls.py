from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('add/', views.add_product, name='add-product'),
    path('list/', views.get_products, name='get-products'),
]


