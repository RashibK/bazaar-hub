from django.shortcuts import render
from products.models import Product
from .models import Cart
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import CartSerializer
from products.serializers import ProductSerializer

# Adding product to a cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_product_to_cart(request, product_id):
    if request.method == 'POST':
        product = Product.objects.get(id= product_id)
        cart = Cart.objects.get(user_id = request.user.id)

        cart.product.add(product)

        return Response(status=status.HTTP_201_CREATED)
        

# displaying all products of a cart

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_products(request):
    cart = Cart.objects.filter(user_id = request.user.id)

    serializer = CartSerializer(cart, many=True)
    products = Product.objects.filter(id__in = serializer.data[0]['product'])
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


#removing a product from the cart

# pure function that gets all the items from the cart

def getitems(request):
    cart = Cart.objects.filter(user_id = request.user.id)

    serializer = CartSerializer(cart, many=True)
    products = Product.objects.filter(id__in = serializer.data[0]['product'])
    serializer = ProductSerializer(products, many=True)
    return serializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def remove_product_from_cart(request, product_id):
    
    cart = Cart.objects.get(user_id = request.user.id)
    product = Product.objects.get(id=product_id)

    cart.product.remove(product)


    cart = Cart.objects.filter(user_id = request.user.id)
    
    serializer = CartSerializer(cart, many=True)
    products = Product.objects.filter(id__in = serializer.data[0]['product'])
    serializer = ProductSerializer(products, many=True)
    
    return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
