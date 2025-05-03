from google.cloud import vision
from dotenv import load_dotenv
import io, os


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'key.json'

food_list = {}

# Updates FoodList
def updateFoodList():
    with open("fruits_vegetables_list.txt", 'r') as f:
        for line in f:
            key, val = line.rstrip().lower(), line.rstrip().lower()
            food_list[key] = val

client = vision.ImageAnnotatorClient()


def getMatchingFood(filename):
    res = []
    with io.open(filename, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.label_detection(image=image)
    labels = response.label_annotations

    for label in labels:
        des = label.description.lower()
        score = round(label.score, 2)
        if (des in food_list):
            res.append(des)
    return res


updateFoodList()

#need to command line
res = getMatchingFood("/home/dhruvesh/Desktop/GDSC-2025/gdsc-hacks-2025/image-classlification/newImage.png")
print(res)





