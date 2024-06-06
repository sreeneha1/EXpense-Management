from rest_framework import serializers
from expenses.models import expenses as ExpensesModel

class ExpenseModelSerilizer(serializers.ModelSerializer):

    class Meta:
        model = ExpensesModel
        fields = '__all__'