from django.db import models
from users.models import User
from products.models import Product
from django.db.models.signals import post_save
from django.dispatch import receiver

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.full_name


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['cart', 'product'], name='unique-product-in-cart')
        ]

    def __str__(self):
        return self.product.name

@receiver(post_save, sender=User)   
def create_cart(sender, instance, created, **kwargs):
    if created:
        cart = Cart.objects.create(user=instance)
        cart.save()

