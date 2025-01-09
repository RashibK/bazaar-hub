from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only= True, required = True, validators=[validate_password])
    password2 = serializers.CharField(write_only = True, required = True)

    class Meta:
        model = User
        fields = ['username', 'email', 'full_name', 'password', 'password2']
    
    def validate(self, data):
        if data['password'] !=  data['password2']:
            raise serializers.ValidationError({
                "password": "Passwords doesn't match"
            })
        
        return data

    def create(self, validated_data):
        user = User.objects.create(username = validated_data['username'], email = validated_data['email'], full_name = validated_data['full_name'])
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['full_name'] = user.full_name
        token['email'] = user.email

        return token
    