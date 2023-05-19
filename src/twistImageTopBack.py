import numpy as np
import cv2

image = cv2.imread("durk.png")  # Replace "your_image.jpg" with your actual image filename

src_points = np.float32([[0, 0], [image.shape[1] - 1, 0], [0, image.shape[0] - 1], [image.shape[1] - 1, image.shape[0] - 1]])
dst_points = np.float32([[50, 0], [image.shape[1] - 51, 0], [0, image.shape[0] - 1], [image.shape[1] - 1, image.shape[0] - 1]])

# Compute the perspective transformation matrix
perspective_matrix = cv2.getPerspectiveTransform(src_points, dst_points)

# Apply the perspective transformation to your image
result = cv2.warpPerspective(image, perspective_matrix, (image.shape[1], image.shape[0]))

# Save the result image to the current working directory
cv2.imwrite("result.png", result)
