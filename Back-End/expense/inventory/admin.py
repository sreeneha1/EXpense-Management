from django.contrib import admin
from .models import Product

# Register your models here.
class inventoryAdmin(admin.ModelAdmin):
    list_display = ('name','price','qty')

admin.site.register(Product,inventoryAdmin)