from django.urls import path
from . import views

urlpatterns = [
    path('recipe', views.recipe, name='recipe'),
    path('image', views.image, name='image')
]