from rest_framework import serializers
from .models import User, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import check_password


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
    


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

        


class UserUpdateSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=False)
    new_password = serializers.CharField(required=False)
    new_password2 = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['username', 'full_name', 'email', 'old_password',  'new_password', 'new_password2']


    def validate(self, attrs):

        user =  self.instance
        if (attrs.get('new_password') and attrs.get('old_password') and attrs.get('new_password2')):
            if user.check_password(attrs['old_password']):

                if attrs['new_password'] == attrs['new_password2']:
                    if attrs['new_password'] != attrs['old_password']:
                        return attrs
                    raise serializers.ValidationError({
                    "password": "old and new passwords are the same"
                    })
                raise serializers.ValidationError({
                    "password": "new password fields doesn't match"
                })
            raise serializers.ValidationError({
                "password": "old password isn't correct"
            })
        else:
            return attrs
    
    def update(self, instance, validated_data):
        
        instance.email = validated_data['email']
        instance.username = validated_data['username']
        instance.full_name = validated_data['full_name']
        
        if (validated_data.get('new_password') and validated_data.get('old_password') and validated_data.get('new_password2')):

            instance.set_password(validated_data['new_password'])
            
        instance.save()
        
        return instance