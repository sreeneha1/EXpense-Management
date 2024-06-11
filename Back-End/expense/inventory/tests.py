# inventory/tests.py
from django.test import TestCase
from inventory.models import Product
from decimal import Decimal

class TestProductModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        Product.objects.create(name='Laptop', price=Decimal('999.99'), qty=10)

    def test_name_max_length(self):
        product = Product.objects.get(id=1)
        max_length = product._meta.get_field('name').max_length
        self.assertEqual(max_length, 100)

    def test_price_max_digits(self):
        product = Product.objects.get(id=1)
        max_digits = product._meta.get_field('price').max_digits
        decimal_places = product._meta.get_field('price').decimal_places
        self.assertEqual(max_digits, 10)
        self.assertEqual(decimal_places, 2)

    def test_qty_field_type(self):
        product = Product.objects.get(id=1)
        field_type = product._meta.get_field('qty').get_internal_type()
        self.assertEqual(field_type, 'IntegerField')

    def test_serialize_method(self):
        product = Product.objects.get(id=1)
        expected_data = {
            'id': product.id,
            'name': 'Laptop',
            'price': Decimal('999.99'),  # Use Decimal for expected value
            'qty': 10
        }
        self.assertEqual(product.serialize(), expected_data)

    def test_sum_property(self):
        product = Product.objects.get(id=1)
        expected_sum = Decimal('9999.90')  # Use Decimal for expected value
        self.assertEqual(product.sum, expected_sum)
