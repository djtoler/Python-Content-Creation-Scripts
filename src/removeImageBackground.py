from rembg import remove
from PIL import Image

# Store the path of the image in the variable input_path
input_path = 'durk.jpg'

# Store the path of the output image in the variable output_path
output_path = 'output_durk.png'

# Processing the image
input_image = Image.open(input_path)

# Removing the background from the given image
output_image = remove(input_image)

# Saving the image as a PNG file
output_image.save(output_path)
