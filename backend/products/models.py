from django.db import models



class Category(models.Model):   
    class ProductType(models.TextChoices):
        ELECTRONICS_AND_GADGETS =  'Electronics & Gadgets'
        FASHION = 'Fashion'
        HOME_AND_FURNITURE = 'Home & Furniture'
        BEAUTY_AND_PERSONAL_CARE = 'Beauty & Personal Care'
        HEALTH_AND_WELLNESS = 'Health & Wellness'
        GROCERY_AND_ESSENTIALS = 'Grocery & Essentials'
        SPORTS_AND_OUTDOORS = 'Sports & Outdoors'
        BOOKS_MUSIC_AND_STATIONARY = 'Books, Music, & Stationery'
        TOYS_AND_HOBBIES = 'Toys & Hobbies'
        AUTOMOTIVE = 'Automotive'
        INDUSTRIAL_AND_BUSINESS_SUPPLIES = 'Industrial & Business Supplies'
        TRAVEL_AND_LUGGAGE = 'Travel & Luggage'
        ART_AND_COLLECTIBLES = 'Art & Collectibles'

    name = models.CharField(choices=ProductType, max_length=50, default=ProductType.ELECTRONICS_AND_GADGETS)

    def __str__(self):
        return self.name

class Product(models.Model):
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    rating = models.FloatField(blank=True, default=2.5)
    rating_number = models.IntegerField(blank=True, default=50)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.name
