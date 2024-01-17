from pprint import pprint
from PIL import Image
import numpy as np
from pprint import pprint

def convert_to_2d(pixels):
    n = len(pixels)
    width = int( n ** 0.5 )
    new_image = []
    count = 0
    i = 0
    while i < n:
        count = 0
        image = []
        while count < width:
            image.append(pixels[i])
            count+=1
            i+=1
        new_image.append(image)
    pprint(new_image)
    return new_image



pixels = convert_to_2d(
    [
        [122, 122, 122], [136, 136, 136], [150, 150, 150], [165, 165, 165],
        [136, 136, 136], [141, 141, 141], [145, 145, 145], [150, 150, 150], 
        [150, 150, 150], [145, 145, 145], [141, 141, 141], [136, 136, 136], 
        [165, 165, 165], [150, 150, 150], [136, 136, 136], [122, 122, 122]
    ]
)
array = np.array(pixels, dtype=np.uint8)

# Use PIL to create an image from the new array of pixels
new_image = Image.fromarray(array)
print(new_image)
new_image.save('orig.png')
