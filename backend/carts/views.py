from django.shortcuts import render
from products.models import Product
from .models import Cart
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_product_to_cart(request, id):
    if request.method == 'POST':
        product = Product.objects.get(id=id)
        cart = Cart.objects.get(user_id = request.user.id)

        cart.product.add(product)

        return Response(status=status.HTTP_201_CREATED)