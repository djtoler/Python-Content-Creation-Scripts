from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
from moviepy.video.fx.all import resize, fadeout

# Load your video
clip = VideoFileClip("durklonley.mp4")

# Load your image and make it last for the duration of the video
image_clip = ImageClip("durk.png", duration=2)

# Define a zoom function
def zoom(t):
    return 1 + (100 * t / clip.duration) # Adjust the 2 here to control the zoom speed

# Resize and position the image to fill the frame
image_clip = image_clip.resize(height=clip.size[1]) # resize to match the video's height
image_clip = image_clip.set_position('center') # position in the center of the frame

# Apply a zoom effect to the image
image_clip = image_clip.resize(lambda t : zoom(t))

# Fade out the image after the zoom
image_clip = fadeout(image_clip, 1) # Here, 1 is the duration of the fade out in seconds

# Overlay the image onto the video using CompositeVideoClip
final_clip = CompositeVideoClip([clip, image_clip.set_duration(clip.duration)])

# Write the result to a file
final_clip.write_videofile("output.mp4", fps=clip.fps)


