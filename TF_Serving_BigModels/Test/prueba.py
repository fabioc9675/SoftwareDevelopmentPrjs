from json import JSONEncoder
import json
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
import requests


class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)


# respuesta = requests.get('https://tse3.mm.bing.net/th?id=OIP.NRCDGEHDW-CZejKKhLSigAHaFh&pid=Api&P=0&w=222&h=165')
# img = Image.open(BytesIO(respuesta.content))
img = Image.open("Test/Photos/cuchara.jpg")
img = np.array(img).astype(float)/255
img = cv2.resize(img, (224, 224))
img = img.reshape(-1, 224, 224, 3)


numpyData = {"instances": img}
encodedNumpyData = json.dumps(numpyData, cls=NumpyArrayEncoder)
res = requests.post(
    "http://localhost:8601/v1/models/cocina_model:predict", data=encodedNumpyData)
print(res.text)
