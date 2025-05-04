from django.urls import path
from . import views

urlpatterns = [
    path('recipe', views.recipe, name='recipe'),
    path('recipe-email', views.recipe_email, name='recipe'),
    path('image', views.image, name='image'),
    path('pdf', views.pdf, name='pdf')
]