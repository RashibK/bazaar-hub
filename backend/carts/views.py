from django.shortcuts import render
from products.models import Product
from .models import Cart, CartItem
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import CartSerializer, CartItemSerialier
from products.serializers import ProductSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import stripe



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



# get the Stripe API key
stripe.api_key = settings.STRIPE_SECRET_KEY

# @csrf_exempt
# def create_checkout_session(request):
#     try:
#         session = stripe.checkout.Session.create(
#             ui_mode = 'embedded',   
#             line_items=[
#                         {
#                             # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
#                             'price': '{{PRICE_ID}}',
#                             'quantity': 1,
#                         },
#                     ],

#             mode = 'payment',
#             return_url = settings.YOUR_DOMAIN + '/return.html?session_id={CHECKOUT_SESSION_ID}',
#         )
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=400)
    
#     return JsonResponse({'clientSecret': session.client_secret})


def session_status(request):
    session_id = stripe.checkout.Session.get('session_id')

    if not session_id:
        return JsonResponse({'error': 'Session ID is required'}, status=400)
        
    try: 
        session = stripe.checkout.Session.retrieve(('session_id'))

        response_data = {
            'status': session.status,
            'customer_email': session.customer_details.email,

        } 
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse(response_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
        
    #getting the specific cart of the logged in user
    cart = Cart.objects.get(user=request.user)

    #getting the cartitems of that specific cart
    items = CartItem.objects.filter(cart=cart)

      # serializer all the cart items of that cart to send to frontend 
    serializer = CartItemSerialier(items, many = True)
    # print(serializer)
    
    line_items = []
    for item in serializer.data:
        print(item)
        line_items.append({'price_data': {
                    'currency': 'usd',
                    'product_data': { 'name': item['name'],
                                     
                                      },
                    'unit_amount': item['price'],
                },
                'quantity': item['quantity'],
                 })
    try:    
        checkout_session = stripe.checkout.Session.create(
            ui_mode='embedded',
            line_items = line_items,
              mode= 'payment',
              return_url = request.build_absolute_uri('/') + '?cancelled=true',
)

        return Response({'id': checkout_session.id, "clientSecret": checkout_session.client_secret})
    except Exception as e:
        return Response({'error': str(e)})
    

# if payment is success
def payment_success(request):
    return Response(status=status.HTTP_200_OK)

# if payment is cancelled
def payment_cancel(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)