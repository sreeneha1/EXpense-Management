from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from django.contrib.auth.models import User
from expenses.models import expenses
import json


# Create your tests here.

class ExpensesTestCase(APITestCase):
     def setUp(self):
        owner = User.objects.create_user(username = "neha", password = "qwerty",email = "neha@gmail.com")
        expense = expenses(description="test1",category=3,amount=123,created_at="2024-06-04",user = owner)
        expense.save()

        response = self.client.post(
            reverse("token_obtain_pair"),
            {
                "username": "neha",
                "password": "qwerty",
            },
        )

        token = response.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    
     def test_get_expenses(self):
         response = self.client.get(reverse("expenses"))
         self.assertEqual(response.status_code, status.HTTP_200_OK)
         self.assertEqual(len(response.data),1)

     def test_post_expenses(self):
         response = self.client.post(reverse("expenses"), {
             "description":"test2",
             "category":3,
             "amount":500,
             "date":"2024-06-11"
         },)
         self.assertEqual(response.status_code , status.HTTP_200_OK)
         self.assertEqual(response.data["description"],"test2")
     
     def test_put_expenses(self):
         response = self.client.post(reverse("expenses"), {
             "id":1,
             "description":"test1changed",
             "category":2,
             "amount":500,
             "date":"2024-06-11"
         },)
         self.assertEqual(response.status_code , status.HTTP_200_OK)
         self.assertEqual(response.data["description"],"test1changed")
         self.assertEqual(response.data["amount"],500)

     def test_delete_expenses(self):
         response = self.client.delete(reverse("expenses"), {
             "id":1
         })
         print(response.data)
         self.assertEqual(response.status_code, status.HTTP_200_OK)
         self.assertNotEqual(len(response.data),1)

class UnAuthTestCase(APITestCase):
    def test_unauth(self):
        response = self.client.get(reverse("expenses"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)