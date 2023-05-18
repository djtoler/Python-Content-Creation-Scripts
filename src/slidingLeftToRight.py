from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip

# Load your video
video = VideoFileClip('durklonley.mp4')

# Load your image as a clip, resize it, and set its duration to match the total time
pause_duration = 4  # Shorten the time the image will pause in seconds
total_duration = 4 + pause_duration + 4  # 2 seconds to slide in, pause, 2 seconds to slide out
image = ImageClip('output_durk.png').resize((600, 600)).set_duration(total_duration)

# Define a function for the sliding effect
def slide(t):
    """ returns the position (x,y) of the picture at time t """
    # Width and height of the picture
    w, h = image.size
    # Width and height of the video
    vw, vh = video.size
    # Time at which the slide should start, pause, and end
    start_time, pause_start, pause_end, end_time = 0, 2, 2 + pause_duration, total_duration
    # Maintain the vertical center
    y = vh / 2 - h / 2  
    if t < pause_start:  # Slide in from the left
        progress = (t - start_time) / (pause_start - start_time)
        x = -w + progress * (vw/2 + w/2) 
    elif t >= pause_start and t < pause_end:  # Pause in the middle
        x = vw / 2 - w / 2
    else:  # Slide out towards the right
        progress = (t - pause_end) / (end_time - pause_end)
        x = vw / 2 - w / 2 + progress * (vw/2 + w/2)
    return (x, y)

# Make the image slide from left to right
image_slide = image.set_position(slide)

# Overlay the sliding image on the video
final_video = CompositeVideoClip([video, image_slide])

# Write the result to a file
final_video.write_videofile("output.mp4", fps=video.fps)
