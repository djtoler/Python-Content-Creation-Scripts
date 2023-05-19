import numpy as np
import cv2

# Load your image
image = cv2.imread("durk.png", cv2.IMREAD_UNCHANGED)  # Replace "durk.png" with your actual image filename

# Check if the image has an alpha channel, if not add one
if image.shape[2] < 4:
    # Convert the image from BGR to BGRA
    image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)

# Define the source points for the perspective transformation
src_points = np.float32([[0, 0], [image.shape[1] - 1, 0], [0, image.shape[0] - 1], [image.shape[1] - 1, image.shape[0] - 1]])

# Define the destination points
dst_points = np.float32([
    [0, 0], 
    [image.shape[1] - 50, 0],  # Adjusted x-coordinate for top-right
    [0, image.shape[0] - 1], 
    [image.shape[1] - 50, image.shape[0] - 100]  # Adjusted x-coordinate for bottom-right
])

# Compute the perspective transformation matrix
perspective_matrix = cv2.getPerspectiveTransform(src_points, dst_points)

# Apply the perspective transformation to your image
result = cv2.warpPerspective(image, perspective_matrix, (image.shape[1], image.shape[0]), borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))

# Save the result image to the current working directory
cv2.imwrite("result.png", result)
