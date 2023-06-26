import cv2
import numpy as np
from PIL import Image
import os

import tensorflow as tf

imag = cv2.imread(os.getcwd() + os.path.join(os.sep,
                  "tensorflow", "data", "elephant", "images23.jpg"))
img_from_ar = Image.fromarray(imag, 'RGB')
resized_image = img_from_ar.resize((50, 50))

test_image = np.expand_dims(resized_image, axis=0)

# cargar el modelo
model = tf.keras.models.load_model(
    os.getcwd() + os.path.join(os.sep, "tensorflow", "model", "model.h5"))

result = model.predict(test_image)
print(result)
