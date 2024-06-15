from django.urls import path

from . import views

urlpatterns = [
    path('product', views.ProductCRUD.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
]
