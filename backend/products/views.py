from django.shortcuts import render
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser


@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_product(request):
    if request.method == 'POST':
        print(request.data)
        serializer = ProductSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        return Response({"data": "hey"}, status=status.HTTP_200_OK)