from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

@csrf_exempt
@require_POST
def register_user(request):
    request_body = json.loads(request.body)
    username = request_body['username']
    password = request_body['password']
    email = request_body["email"]
    owner = User.objects.create_user(username=username, password=password, email=email)
    owner.save()
    return JsonResponse({"success": True})

class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

def home_view(request):
    return HttpResponse("Welcome to the Home Page")


