from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class TestLogout(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.refresh.access_token)}')

    def test_successful_logout(self):
        response = self.client.post(reverse('logout'), {'refresh_token': str(self.refresh)})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'Logout successful.')

    def test_logout_without_authentication(self):
        self.client.credentials()  # Remove authentication
        response = self.client.post(reverse('logout'), {'refresh_token': str(self.refresh)})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + 'invalidtoken')
        response = self.client.post(reverse('logout'), {'refresh_token': 'invalidtoken'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_when_already_logged_out(self):
        response = self.client.post(reverse('logout'), {'refresh_token': str(self.refresh)})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

        # Attempt to use the same refresh token again
        response = self.client.post(reverse('logout'), {'refresh_token': str(self.refresh)})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logout_with_missing_refresh_token(self):
            response = self.client.post(reverse('logout'), {})
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
