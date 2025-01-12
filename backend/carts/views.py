from django.shortcuts import render
from products.models import Product
from .models import Cart, CartItem
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import CartSerializer, CartItemSerialier
from products.serializers import ProductSerializer

# Adding product to a cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_product_to_cart(request, product_id):
    if request.method == 'POST':
        #getting the product
        product = Product.objects.get(id= product_id)
        #getting the user cart
        cart = Cart.objects.get(user_id = request.user.id)

        # returns false in second variable if it was already created.
        cartitem, created = CartItem.objects.get_or_create(product=product, cart=cart)
        # if it was already created, then we just increase the item's quantity by 1
        if not created:
            cartitem.quantity += 1
            cartitem.save()

            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_201_CREATED)

# displaying all products of a cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_products(request):
    
    #getting the specific cart of the logged in user
    cart = Cart.objects.get(user=request.user)

    #getting the cartitems of that specific cart
    items = CartItem.objects.filter(cart=cart)

    # serializer all the cart items of that cart to send to frontend 
    serializer = CartItemSerialier(items, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#removing a product from the cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def remove_product_from_cart(request, product_id):
    
    cart = Cart.objects.get(user_id=request.user.id)

    items = CartItem.objects.filter(cart_id=cart.id)

    serializer = CartItemSerialier(items, many=True)
    
    for item in serializer.data:

        if item['product_id'] == product_id:

                item = CartItem.objects.get(product_id=item['product_id'], cart_id=cart.id)
                item.delete()
                
                # getting the updated items with updated quantity
                items = CartItem.objects.filter(cart_id=cart.id)

                serializer  = CartItemSerialier(items, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_204_NO_CONTENT)

# descreasing the quantity of a product
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def decrease_product_quantity_from_cart(request, product_id):
    
    cart = Cart.objects.get(user_id=request.user.id)

    items = CartItem.objects.filter(cart_id=cart.id)

    serializer = CartItemSerialier(items, many=True)
    
    for item in serializer.data:

        if item['product_id'] == product_id:

            if item['quantity'] > 1:
                item = CartItem.objects.get(product_id=item['product_id'], cart_id=cart.id)
                item.quantity = item.quantity - 1
                item.save()

                # getting the updated items with updated quantity
                items = CartItem.objects.filter(cart_id=cart.id)

                serializer  = CartItemSerialier(items, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            else:
                item = CartItem.objects.get(product_id=item['product_id'], cart_id=cart.id)
                item.delete()
                
                # getting the updated items with updated quantity
                items = CartItem.objects.filter(cart_id=cart.id)

                serializer  = CartItemSerialier(items, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_204_NO_CONTENT)

#increasing the quantity of a product
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def increase_product_quantity_from_cart(request, product_id):
    if request.method == 'GET':
        #getting the product
        product = Product.objects.get(id= product_id)
        #getting the user cart
        cart = Cart.objects.get(user_id = request.user.id)

        # returns false in second variable if it was already created.
        cartitem, created = CartItem.objects.get_or_create(product=product, cart=cart)
        # if it was already created, then we just increase the item's quantity by 1
        if not created:
            cartitem.quantity += 1
            cartitem.save()

            # getting the updated items with updated quantity
            items = CartItem.objects.filter(cart_id=cart.id)

            serializer  = CartItemSerialier(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_201_CREATED)

        