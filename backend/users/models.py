from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=500)
    email = models.CharField(max_length=100, unique=True)

        
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "full_name"]

    def __str__(self):
        return self.username



