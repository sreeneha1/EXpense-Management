from django.contrib import admin
from expenses.models import expenses

# Register your models here.
class expensesAdmin(admin.ModelAdmin):
    pass

admin.site.register(expenses,expensesAdmin)