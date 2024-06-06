from django.contrib import admin
from expenses.models import expenses

# Register your models here.
class expensesAdmin(admin.ModelAdmin):
    list_display = ('description','category','amount','created_at')

admin.site.register(expenses,expensesAdmin)