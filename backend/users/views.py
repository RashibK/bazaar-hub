from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

# Create your views here.
# @csrf_exempt
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer  


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkout(request):
    
    return Response("Hey!!", status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def home(request):
    if request.method == 'GET':
         return Response('Hey', status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        return Response('Hey, poster', status=status.HTTP_200_OK)