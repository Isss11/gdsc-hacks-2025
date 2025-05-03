from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from google import genai
from pydantic import BaseModel
import os

class Recipe(BaseModel):
  name: str
  cultures: list[str]
  ingredients: list[str]
  steps: list[str]

@api_view(['POST'])
def recipe(request):
    if request.method == "POST":
        body = json.loads(request.body)
        cultures = [culture.capitalize() for culture in body.get("cultures", [])]
        ingredients = [ingredient.capitalize() for ingredient in body.get("ingredients", [])]

        recipe_prompt = f"Give me a list of recipes (minimum: 3, maximum 9) for the cultures: {cultures} using the ingredients: {ingredients}."
        
        api_key = os.getenv("GOOGLE_API_KEY")
        
        client = genai.Client(api_key=api_key)

        prompt_response = client.models.generate_content(
            model="gemini-2.0-flash", contents=recipe_prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': list[Recipe],
            },
        )
        
        recipes = [recipe.model_dump() for recipe in prompt_response.parsed]
        
        response = {
            "cultures": cultures,
            "ingredients": ingredients,
            "recipes": recipes
        }
        
        return JsonResponse(response, status=200)