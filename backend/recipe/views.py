from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from google import genai
from pydantic import BaseModel
import os
from google.cloud import vision
from dotenv import load_dotenv
import io, os
from pathlib import Path
import base64
from django.core.mail import send_mail
from asgiref.sync import async_to_sync
from pyppeteer import launch
from playwright.async_api import async_playwright
import asyncio
from django.http import HttpResponse

class Recipe(BaseModel):
  name: str
  cultures: list[str]
  ingredients: list[str]
  steps: list[str]

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'key.json'

food_list = {}
with open("fruits_vegetables_list.txt", 'r') as f:
    for line in f:
        key, val = line.rstrip().lower(), line.rstrip().lower()
        food_list[key] = val

client = vision.ImageAnnotatorClient()


def getMatchingFood(content):
    res = []
    image = vision.Image(content=content)
    response = client.label_detection(image=image)
    labels = response.label_annotations

    for label in labels:
        des = label.description.lower()
        score = round(label.score, 2)
        
        if (des in food_list):
            res.append(des)
    return res

async def get_pdf(url, details):

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await browser.new_page()
        await page.goto(url, wait_until="networkidle")

        # Step 2: Set localStorage (must match the domain of your actual URL)
        await page.evaluate(
            "([key, value]) => localStorage.setItem(key, value)",
            ["details", json.dumps(details)]
        )
        await page.reload(wait_until="networkidle")

        pdf_bytes = await page.pdf(format="A4")
        await browser.close()
        return pdf_bytes


@api_view(['POST'])
def image(request):
    if request.method == "POST":
        
        img_data_json = json.loads(request.body)
        stuff, img_data = img_data_json.get('image', []).split(',', 1)
        img_data_binary = base64.b64decode(img_data)

        
        result = getMatchingFood(img_data_binary)
        response = {k: k for k in result} 
        return JsonResponse(response, status=200)
    
@api_view(['POST'])
def recipe(request):
    if request.method == "POST":
        body = json.loads(request.body)
        
        cultures = [culture.capitalize() for culture in body.get("cultures", [])]
        ingredients = [ingredient.capitalize() for ingredient in body.get("ingredients", [])]

        recipe_prompt = f"Give me a list of recipes (minimum: 3, maximum 9) for the cultures: {cultures} using the ingredients: {ingredients}."
        
        api_key = "AIzaSyAX2TGWxdWD9kAhQq9-WyPB0u3A7uKrtII"
        print(api_key)
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
    
@api_view(['POST'])
def recipe_email(request):
    body = json.loads(request.body)
    recipe = body.get("recipe")
    recipient = body.get("recipient")
    
    email_body = f"""Name: {recipe.get("name")}\nCultures: {", ".join(recipe.get("cultures"))}\n"""
    
    email_body += "\nIngredients:\n"
    
    for ingredient in recipe.get("ingredients"):
        email_body += f"- {ingredient}\n"
    
    email_body += "\nSteps:\n"
    
    for index, step in enumerate(recipe.get("steps")):
        email_body += f"{index + 1}. {step}\n"
        
    email_body += "\n Thank you for using LeftoverMesh."
    
    if request.method == "POST":
        send_mail(
        subject=f"{recipe.get('name')} recipe from LeftoverMesh",
        message=email_body,
        from_email='leftovermesh@gmail.com',
        recipient_list=[recipient],
        fail_silently=False,
    )
        
        response = {
            "message": f"{recipe.get('name')} sent to {recipient} successfully."
        }
        
        return JsonResponse(response, status=200)


@api_view(['POST'])
def pdf(request):
    if request.method == "POST":
        body = json.loads(request.body)
        url = body.get('pdf_url', [])
        details = body.get('details', [])
        print(details)
    
        pdf_bytes = asyncio.run(get_pdf(url, details))


        response = HttpResponse(
            pdf_bytes,
            content_type="application/pdf"
        )

        response['Content-Disposition'] = 'attachment; filename="output.pdf"'

 
        
        return response
