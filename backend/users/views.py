from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserSerializer, ProfileSerializer, UserUpdateSerializer
from .models import User, Profile

# for registering new users
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer  

# random testing
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkout(request):
    
    return Response("Hey!!", status=status.HTTP_200_OK)


# for hompage

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def home(request):
    if request.method == 'GET':
         user = User.objects.all()
         serializer = UserSerializer(user, many=True)

         return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        return Response('Hey, poster', status=status.HTTP_200_OK)
    

# for profile page

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request, id):
    if request.method == 'GET':
        profile = Profile.objects.get(user_id = id)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request, id):
    if request.method == 'PUT':
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return Response({"data": "user not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # passing my id to userupadteserialier through context
            serializer = UserUpdateSerializer(user, data=request.data, context  = {"context": id})
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_202_ACCEPTED)
            
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

