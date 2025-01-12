from rest_framework import serializers
from .models import Cart, CartItem


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerialier(serializers.ModelSerializer):
    name = serializers.CharField(source='product.name')
    product_id = serializers.IntegerField(source='product.id')
    image = serializers.ImageField(source='product.image')
    price = serializers.IntegerField(source='product.price')
    rating = serializers.FloatField(source='product.rating')
    rating_number = serializers.IntegerField(source='product.rating_number')

    category_name = serializers.CharField(source='product.category.name', read_only = True)
    

    class Meta:
        model = CartItem
        fields = ['product_id', 'quantity', 'name', 'image', 'price', 'rating', 'rating_number', 'category_name']