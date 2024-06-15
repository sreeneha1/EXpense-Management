from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from expenses.models import expenses
from expenses.serializers import ExpenseModelSerilizer
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser



# Create your views here.
class expenseCRUD(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]


    def get(self, request):
        expenses_object = expenses.objects.filter(user = request.user)
        serialized_obj = ExpenseModelSerilizer(expenses_object,many=True)
        return Response(serialized_obj.data)

    def post(self, request):
        request_body = request.data
        description = request_body["description"]
        category = request_body["category"]
        amount = request_body["amount"]
        date = request_body['date']
        expenses_object = expenses(description=description,category=category,amount=amount,created_at=date,user = request.user)
        expenses_object.save()
        return Response(ExpenseModelSerilizer(expenses_object).data)
    
    def put(self, request):
        request_body = request.data
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
            expenses_object.created_at=date
            expenses_object.save()
            return Response(ExpenseModelSerilizer(expenses_object).data)
        return Response({"message":"unathorized user"},status=status.HTTP_401_UNAUTHORIZED)

    def delete (self, request):
        request_body = request.data
        id = request_body["id"]
        expenses_object = expenses.objects.get(id=id)
        if expenses_object.user == request.user:
            expenses_object.delete()
            expenses_object = expenses.objects.filter(user = request.user)
            serialized_obj = ExpenseModelSerilizer(expenses_object,many=True)
            return Response(serialized_obj.data)
        return Response({"message":"unathorized user"},status=status.HTTP_401_UNAUTHORIZED)

