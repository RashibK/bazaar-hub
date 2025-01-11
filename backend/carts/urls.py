from django.urls import path, include
from . import views


urlpatterns = [
    path('post/<int:product_id>', views.post_product_to_cart, name='save-to-cart'),
    path('get/', views.get_cart_products, name='get-cart-products'),
]
