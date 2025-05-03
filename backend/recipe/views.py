from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def recipe(request):
    if request.method == "POST":
        return JsonResponse({"name": "Dhruvesh's Daal Makhni"}, status=200)