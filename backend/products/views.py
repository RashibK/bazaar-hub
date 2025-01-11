from django.shortcuts import render
from .serializers import ProductSerializer, ProductSerializerSave
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product

@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_product(request):
    if request.method == 'POST':
        serializer = ProductSerializerSave(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        return Response({"data": "hey"}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_products(request):
    if request.method == 'GET':
        product = Product.objects.all()

        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
