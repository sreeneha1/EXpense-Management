from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from expenses.models import expenses
from expenses.serializers import ExpenseModelSerilizer
import json
from rest_framework import status


# Create your views here.
class expenseCRUD(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        expenses_object = expenses.objects.filter(user = request.user)
        serialized_obj = ExpenseModelSerilizer(expenses_object,many=True)
        return Response(serialized_obj.data)

    def post(self, request):
        request_body = json.loads(request.body)
        description = request_body["description"]
        category = request_body["category"]
        amount = request_body["amount"]
        date = request_body['date']
        expenses_object = expenses(description=description,category=category,amount=amount,created_at=date,user = request.user)
        expenses_object.save()
        return Response(ExpenseModelSerilizer(expenses_object).data)
    
    def put(self, request):
        request_body = json.loads(request.body)
        id = request_body["id"]
        description = request_body["description"]
        category = request_body["category"]
        amount = request_body["amount"]
        date = request_body['date']
        expenses_object = expenses.objects.get(id=id)
        if expenses_object.user == request.user:
            expenses_object.description=description
            expenses_object.category=category
            expenses_object.amount=amount
            expenses_object.date=date
            expenses_object.save()
            return Response(ExpenseModelSerilizer(expenses_object).data)
        return Response({"message":"unathorized user"},status=status.HTTP_401_UNAUTHORIZED)

    def delete (self, request):
        request_body = json.loads(request.body)
        id = request_body["id"]
        expenses_object = expenses.objects.get(id=id)
        if expenses_object.user == request.user:
            expenses_object.delete()
            return Response({"sucess":True})
        return Response({"message":"unathorized user"},status=status.HTTP_401_UNAUTHORIZED)

