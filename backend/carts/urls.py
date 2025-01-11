from django.urls import path, include
from . import views


urlpatterns = [
    path('post/<int:id>', views.post_product_to_cart, name='save-to-cart'),
]
