from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip

# Load your video
video = VideoFileClip('durklonley.mp4')

# Load your image as a clip, resize it, and set its duration to match the total time
pause_duration = 5  # This is the time the image will pause in seconds
total_duration = 4 + pause_duration + 2  # 4 seconds to slide in, pause, 4 seconds to slide out
image = ImageClip('output_durk.png').resize((600, 600)).set_duration(total_duration)

# Define a function for the sliding effect
def slide(t):
    """ returns the position (x,y) of the picture at time t """
    # Width and height of the picture
    w, h = image.size
    # Width and height of the video
    vw, vh = video.size
    # Define the region where the image will slide (bottom-right quadrant)
    region_w = vw / 4
    region_h = vh / 2
    # Time at which the slide should start, pause and end
    start_time, pause_start, pause_end, end_time = 0, 4, 4 + pause_duration, total_duration
    if t < start_time:
        return (vw, vh)  # Start position: image is outside of screen on the right
    elif t < pause_start:
        progress = (t - start_time) / (pause_start - start_time)
        x = vw - progress * w  # Slide in from the right side
        y = vh  # Start at the bottom and slide upwards
        return (x, y)
    elif t >= pause_start and t < pause_end:
        return (vw - w, vh - h)  # Image stays at its final position
    else:
        progress = (t - pause_end) / (end_time - pause_end)
        x = vw - progress * (region_w + w)  # Slide out towards the left side
        y = vh - (1 - progress)  # Start at the final position and slide downwards
        return (x, y)

# Make the image slide from right to left
image_slide = image.set_position(slide)

# Overlay the sliding image on the video
final_video = CompositeVideoClip([video, image_slide])

# Write the result to a file
final_video.write_videofile("output.mp4", fps=video.fps)
