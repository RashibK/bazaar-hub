from django.db import models
from users.models import User
from products.models import Product
from django.db.models.signals import post_save
from django.dispatch import receiver

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product, blank=True)


@receiver(post_save, sender=User)   
def create_cart(sender, instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()

