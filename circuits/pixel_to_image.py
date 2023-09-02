from pprint import pprint
from PIL import Image
import numpy as np

def convert_to_2d(pixels):
    n = len(pixels)
    width = int( n ** 0.5 )
    new_image = []
    count = 0
    for i in pixels:
        count = 0
        image = []
        while count < width:
            image.append(i)
            count+=1
        new_image.append(image)
    return new_image



pixels = convert_to_2d([[150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97], [150, 93, 200], [45, 239, 97]])
array = np.array(pixels, dtype=np.uint8)

# Use PIL to create an image from the new array of pixels
new_image = Image.fromarray(array)
new_image.save('new.png')
