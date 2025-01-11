from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.name', read_only = True)
    # image = serializers.ImageField(required=False)
    class Meta:
        model = Product
        fields = ['image', 'name', 'price', 'rating', 'rating_number', 'id', 'category_name']


class ProductSerializerSave(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['image', 'name', 'price','rating', 'rating_number', 'category']