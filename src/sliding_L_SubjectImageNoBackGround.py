# from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
# from moviepy.video.fx.all import resize, fadeout

# # Load your video
# clip = VideoFileClip("durklonley.mp4")

# # Load your image and make it last for the duration of the video
# image_clip = ImageClip("output_durk.png", duration=clip.duration)

# # Define a zoom function
# def zoom(t):
#     return 1 + (100 * t / clip.duration) # Adjust the 20 here to control the zoom speed

# # Position & size the image
# image_clip = image_clip.set_position((0, 0)) # position in the center of the frame
# image_clip = image_clip.resize((500, 500)) # Replace with your desired width and height

# # Apply a zoom effect to the image
# image_clip = image_clip.resize(lambda t : zoom(t))

# # Fade out the image after the zoom
# image_clip = fadeout(image_clip, 1) # Here, 1 is the duration of the fade out in seconds

# # Overlay the image onto the video using CompositeVideoClip
# final_clip = CompositeVideoClip([clip, image_clip.set_duration(2)])

# # Write the result to a file
# final_clip.write_videofile("output.mp4", fps=clip.fps)



# from moviepy.editor import *
# from moviepy.video.fx.all import crop

# # Load your video
# clip = VideoFileClip('durklonley.mp4')

# # Load your image
# image_clip = ImageClip('durk.png', duration=5)

# # Define a slide function
# def slide(t):
#     # Speed up the sliding effect by increasing the multiplier
#     speed = 7000  # Adjust the speed here
    
#     # Pause the sliding effect midway through the image's duration
#     if t < image_clip.duration / 2:
#         return int(t * speed)
#     elif t < (image_clip.duration / 2) + 2:  # 2 second pause
#         return int((image_clip.duration / 2) * speed)
#     else:
#         return int((t - 2) * speed)  # Continue sliding after the pause

# # Resize the image to a desired height
# desired_height = 600  # Set desired height here
# desired_width = 600  # Set desired width here
# image_clip = image_clip.resize((desired_width, desired_height))

# # Apply a slide effect to the image
# image_clip = image_clip.set_position(lambda t: (slide(t), 'center'))

# # Crop the image to the width of the video
# # image_clip = crop(image_clip, width=clip.size[0])

# # Overlay the image onto the video using CompositeVideoClip
# final_clip = CompositeVideoClip([clip, image_clip])

# # Write the result to a file
# final_clip.write_videofile('output.mp4', fps=clip.fps)




from moviepy.editor import *

# Load your video
clip = VideoFileClip('durklonley.mp4')

# Load your image
image_clip = ImageClip('durk.png', duration=6)  # Increased the duration

# Define the slide in and slide out points and duration
slide_in_point = -image_clip.size[0]
slide_out_point = clip.size[0]
pause_duration = 2  # pause duration in the center
slide_duration = (image_clip.duration - pause_duration) / 2  # slide duration for both slide in and out

# Define a slide function
def slide(t):
    if t < slide_duration:  # slide in
        progress = t / slide_duration
        return slide_in_point + progress * (clip.size[0]/2)
    elif t < slide_duration + pause_duration:  # pause
        return clip.size[0]/2
    else:  # slide out
        progress = (t - slide_duration - pause_duration) / slide_duration
        return clip.size[0]/2 + progress * (clip.size[0]/2)

# Resize the image to a desired height and width
desired_height = 600  # Set desired height here
desired_width = 600  # Set desired width here
image_clip = image_clip.resize((desired_width, desired_height))

# Apply a slide effect to the image
image_clip = image_clip.set_position(lambda t: (slide(t), 'center'))

# Overlay the image onto the video using CompositeVideoClip
final_clip = CompositeVideoClip([clip, image_clip])

# Write the result to a file
final_clip.write_videofile('output.mp4', fps=clip.fps)






