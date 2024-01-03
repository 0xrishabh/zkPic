import numpy as np
import matplotlib.pyplot as plt
import math

def bilinear_resize(image, height, width):

  img_height, img_width = image.shape[:2]

  resized = np.empty([height, width])

  x_ratio = float(img_width - 1) / (width - 1) if width > 1 else 0
  y_ratio = float(img_height - 1) / (height - 1) if height > 1 else 0

  for i in range(height):
    for j in range(width):

      x_l, y_l = math.floor(x_ratio * j), math.floor(y_ratio * i)
      x_h, y_h = math.ceil(x_ratio * j), math.ceil(y_ratio * i)

      x_weight = (x_ratio * j) - x_l
      y_weight = (y_ratio * i) - y_l

      a = image[y_l, x_l]
      b = image[y_l, x_h]
      c = image[y_h, x_l]
      d = image[y_h, x_h]

      pixel = a * (1 - x_weight) * (1 - y_weight) + b * x_weight * (1 - y_weight) + \
              c * y_weight * (1 - x_weight) + \
              d * x_weight * y_weight

      resized[i][j] = pixel

  return resized.astype(np.uint8)

original_image = np.array([
  [122, 165],
  [165, 122]
])


resized_image = bilinear_resize(original_image, 4, 4)
print(resized_image)
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.title("Original Image")
plt.imshow(original_image)
plt.subplot(1, 2, 2)
plt.title("Resized Image")
plt.imshow(resized_image)
plt.show()
