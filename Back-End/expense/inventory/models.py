from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    qty = models.IntegerField()

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'qty': self.qty
        }

    @property
    def sum(self):
        return self.price * self.qty
