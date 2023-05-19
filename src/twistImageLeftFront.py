import numpy as np
import cv2

image = cv2.imread("durk.png")  # Replace "your_image.jpg" with your actual image filename

# Define the source and destination points for the perspective transformation
src_points = np.float32([[0, 0], [image.shape[1] - 1, 0], [0, image.shape[0] - 1], [image.shape[1] - 1, image.shape[0] - 1]])

dst_points = np.float32([
    [0, 0], 
    [image.shape[1] - 50, 50],  # Adjusted x-coordinate and y-coordinate for top-right
    [0, image.shape[0] - 1], 
    [image.shape[1] - 50, image.shape[0] - 130]  # Adjusted x-coordinate and y-coordinate for bottom-right
])


# Compute the perspective transformation matrix
perspective_matrix = cv2.getPerspectiveTransform(src_points, dst_points)

# Apply the perspective transformation to your image
result = cv2.warpPerspective(image, perspective_matrix, (image.shape[1], image.shape[0]))

# Save the result image to the current working directory
cv2.imwrite("result.png", result)
