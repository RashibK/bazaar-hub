from django.urls import path, include
from . import views


urlpatterns = [
    path('post/<int:product_id>', views.post_product_to_cart, name='save-to-cart'),
    path('get/', views.get_cart_products, name='get-cart-products'),
    path('product/remove/<int:product_id>', views.remove_product_from_cart, name='remove-cart-product'),
    path('product/decrease/<int:product_id>', views.decrease_product_quantity_from_cart, name='descre-cart-product-quantity'),
    path('product/increase/<int:product_id>', views.increase_product_quantity_from_cart, name='descre-cart-product-quantity'),
]
