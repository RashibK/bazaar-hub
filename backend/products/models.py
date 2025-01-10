from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    price = models.FloatField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)


