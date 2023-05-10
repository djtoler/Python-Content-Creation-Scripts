from moviepy.editor import *

gif_1 = ImageClip("file1.gif")
gif_2 = ImageClip("file2.gif")
gif_3 = ImageClip("file3.gif")

gif_concatenated = concatenate_videoclips([gif_1, gif_2, gif_3])

gif_concatenated.write_videofile("output.mp4")

