from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=500)
    email = models.CharField(max_length=100, unique=True)

        
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "full_name"]

    def __str__(self):
        return self.username



class Profile(models.Model):
    bio = models.CharField(max_length=1000)
    address = models.CharField(max_length=1000)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='profiles/default.jpg/')

    def __str__(self):
        return self.user.full_name


@receiver(post_save, sender=User)
def create_save_profile(sender, created, instance, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)
        profile.save()





