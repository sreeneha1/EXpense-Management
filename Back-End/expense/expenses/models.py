from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class expenses(models.Model):
    class category_choice(models.IntegerChoices):
            franchising = 1 , "franchising"
            rental_and_leasing = 2 , "Rental and leasing"
            online_shop = 3 , "Online shop"
            wholesale = 4 , "Wholesale"
            retail = 5 , "Retail"
            handling_fees = 6 , "Handling fees"



    description = models.CharField(max_length=250)
    category = models.IntegerField(choices=category_choice.choices)
    amount = models.IntegerField()
    created_at = models.DateField()
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=1)