from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from expenses.models import expenses
from expenses.serializers import ExpenseModelSerilizer
import json


# Create your views here.
class expenseCRUD(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        expenses_object = expenses.objects.all()
        serialized_obj = ExpenseModelSerilizer(expenses_object,many=True)
        return Response(serialized_obj.data)

    
