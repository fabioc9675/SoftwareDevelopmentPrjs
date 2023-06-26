from PIL import Image
import cv2
import numpy as np
import os

# Temporal storage for labels and images
data = []
labels = []


def animalsConvert(animals, addr, label):
    # Function to load animals
    for x in animals:
        """
        Loop through all the images in the directory
        1. Convert to arrays
        2. Resize the images
        3. Add image to dataset
        4. Add the label
        """
        print(x)
        imag = cv2.imread(os.getcwd() + addr + os.sep + x)
        img_from_ar = Image.fromarray(imag, 'RGB')
        resized_image = img_from_ar.resize((50, 50))
        data.append(np.array(resized_image))
        labels.append(label)
    return


os.sep = '/'

# Directories
cats_dir = os.path.join(os.sep, "tensorflow", "datasets", "cat")
dogs_dir = os.path.join(os.sep, "tensorflow", "datasets", "dog")
monk_dir = os.path.join(os.sep, "tensorflow", "datasets", "monkey")
parr_dir = os.path.join(os.sep, "tensorflow", "datasets", "parrot")
elep_dir = os.path.join(os.sep, "tensorflow", "datasets", "elephant")
bear_dir = os.path.join(os.sep, "tensorflow", "datasets", "bear")

# Get the animal directory
cats = os.listdir(os.getcwd() + cats_dir)
dogs = os.listdir(os.getcwd() + dogs_dir)
monk = os.listdir(os.getcwd() + monk_dir)
parr = os.listdir(os.getcwd() + parr_dir)
elep = os.listdir(os.getcwd() + elep_dir)
bear = os.listdir(os.getcwd() + bear_dir)

# LABELS
# -------------------------
# Cat 0
# Dog 1
# Monkey 2
# Parrot 3
# Elephant 4
# Bear 5
# -------------------------
# Compose images
animalsConvert(cats, cats_dir, 0)
animalsConvert(dogs, dogs_dir, 1)
animalsConvert(monk, monk_dir, 2)
animalsConvert(parr, parr_dir, 3)
animalsConvert(elep, elep_dir, 4)
animalsConvert(bear, bear_dir, 5)


# load in animals and labels
animals = np.array(data)
labels = np.array(labels)
# Save
np.save("animals", animals)
np.save("labels", labels)
