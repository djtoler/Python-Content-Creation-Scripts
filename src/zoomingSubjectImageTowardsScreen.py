
from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip
from moviepy.video.fx.all import resize, fadeout

# Load your video
clip = VideoFileClip("durklonley.mp4")

# Load your image and make it last for the duration of the video
image_clip = ImageClip("output_durk.png", duration=3)

# Define a zoom function
def zoom(t):
    return 1 + (100 * t / clip.duration) # Adjust the 20 here to control the zoom speed

# Position & size the image
image_clip = image_clip.set_position((0, 0)) # position in the center of the frame
image_clip = image_clip.resize((500, 500)) # Replace with your desired width and height

# Apply a zoom effect to the image
image_clip = image_clip.resize(lambda t : zoom(t))

# Fade out the image after the zoom
image_clip = fadeout(image_clip, 1) # Here, 1 is the duration of the fade out in seconds

# Overlay the image onto the video using CompositeVideoClip
final_clip = CompositeVideoClip([clip, image_clip.set_duration(2)])

# Write the result to a file
final_clip.write_videofile("output.mp4", fps=clip.fps)

