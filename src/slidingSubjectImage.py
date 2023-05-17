from moviepy.editor import VideoFileClip, ImageClip
from moviepy.video.io.bindings import mplfig_to_npimage
from moviepy.video.compositing.CompositeVideoClip import CompositeVideoClip
from moviepy.video.fx.all import resize

# Load the video clip
video = VideoFileClip("durklonley.mp4")

# Load the image clip and resize it if needed
# image = ImageClip("durk.jpg").fx(resize, width=100)

# # Calculate the duration in seconds for the image animation
# duration = 2

# # Define the position and animation parameters
# x_pos = 100  # X-coordinate of the top-left corner of the image
# y_pos = 200  # Y-coordinate of the top-left corner of the image
# slide_in_start = 5  # Start time in seconds for the image slide-in animation
# slide_out_start = slide_in_start + duration  # Start time in seconds for the image slide-out animation

# # Create a CompositeVideoClip by overlaying the image on the video
# composite = CompositeVideoClip([
#     video,
#     image.set_position((x_pos, y_pos)).set_start(slide_in_start).set_duration(duration),
#     image.set_position((x_pos, y_pos)).set_start(slide_out_start).set_duration(duration)
# ])

# # Set the duration of the composite video to match the input video
# composite = composite.set_duration(video.duration)

# # Write the final video to a file
# composite.write_videofile("output_video.mp4", codec="libx264")


image = ImageClip("durk.jpg").set_duration(video.duration)

# Define the starting and ending positions for the image
start_position = (-image.w, image.h//2)
end_position = (video.w, image.h//2)

# Define the duration of the sliding animation in seconds
slide_duration = 2

# Animate the image sliding into the video
sliding_image = (image
                 .set_position(start_position)
                 .fx(lambda clip, t: clip.set_position((start_position[0] + (end_position[0] - start_position[0]) * min(t/slide_duration, 1), start_position[1])), apply_to='position')
                 .set_duration(slide_duration)
                 )

# Animate the image sliding out of the video
sliding_out_image = (image
                     .fx(lambda clip, t: clip.set_position((end_position[0] + (start_position[0] - end_position[0]) * min(t/slide_duration, 1), end_position[1])), apply_to='position')
                     .set_duration(slide_duration)
                     )

# Concatenate the video and sliding image
result = concatenate([video, sliding_image, sliding_out_image])

# Write the final video to a file
result.write_videofile("output_video.mp4", codec="libx264")
