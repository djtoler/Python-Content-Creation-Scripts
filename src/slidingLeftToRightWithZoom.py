import cv2
import numpy as np

cap = cv2.VideoCapture('durklonley.mp4')
img = cv2.imread('durk.png')
img = cv2.resize(img, (600, 600))

fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('output.mp4', fourcc, fps, (width, height))

slide_in_frames = int(fps * 2)  # Slide in for 2 seconds
pause_frames = int(fps * 4)  # Pause for 4 seconds
slide_out_frames = int(fps * 2)  # Slide out for 2 seconds

start_x, start_y = -img.shape[1], height // 2 - img.shape[0] // 2
end_x, end_y = width, height // 2 - img.shape[0] // 2

zoom1_start, zoom1_end = slide_in_frames + int(pause_frames * 0.25), slide_in_frames + int(pause_frames * 0.5)
zoom2_start, zoom2_end = slide_in_frames + int(pause_frames * 0.5), slide_in_frames + int(pause_frames * 0.75)

for frame_number in range(int(frame_count)):
    ret, frame = cap.read()
    if not ret:
        break

    if frame_number < slide_in_frames + pause_frames + slide_out_frames:
        if frame_number < slide_in_frames:  # Slide in
            progress = frame_number / slide_in_frames
            x = int(start_x + progress * (width // 2 - start_x))
            y = start_y
            x = max(0, x)  # Ensure x is not less than 0
            x = min(x, width - img.shape[1])  # Ensure x does not exceed frame width
            frame[y:y+img.shape[0], x:x+img.shape[1]] = img
        elif frame_number < slide_in_frames + pause_frames:  # Pause and zoom
            x, y = width // 2, start_y
            if zoom1_start <= frame_number < zoom1_end:  # Zoom on top left
                zoomed_img = cv2.resize(img[0:300, 0:300], img.shape[0:2])
                frame[y:y+zoomed_img.shape[0], x:x+zoomed_img.shape[1]] = zoomed_img
            elif zoom2_start <= frame_number < zoom2_end:  # Zoom on top right
                zoomed_img = cv2.resize(img[0:300, 300:600], img.shape[0:2])
                frame[y:y+zoomed_img.shape[0], x:x+zoomed_img.shape[1]] = zoomed_img
            else:
                frame[y:y+img.shape[0], x:x+img.shape[1]]

    out.write(frame)

cap.release()
out.release()
