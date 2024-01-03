from PIL import Image
import numpy as np

# Load the image
image = Image.open(input())

# Convert the image to RGB (if it's not already in this format)
image = image.convert('RGB')

# Convert the image to a numpy array
pixel_array = np.array(image)

print(pixel_array)
