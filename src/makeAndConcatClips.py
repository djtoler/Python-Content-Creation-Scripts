from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.video.compositing.concatenate import concatenate_videoclips



video = VideoFileClip("krump.mp4")

start_time_1 = 0  # Start time in seconds
end_time_1 = 27  # End time in seconds
clip1 = video.subclip(start_time_1, end_time_1)

start_time_4 = 34  # Start time in seconds
end_time_4 = 47  # End time in seconds
clip4 = video.subclip(start_time_4, end_time_4)

start_time_2 = 52  # Start time in seconds
end_time_2 = 66  # End time in seconds
clip2 = video.subclip(start_time_2, end_time_2)

start_time_3 = 90  # Start time in seconds
end_time_3 = 105  # End time in seconds
clip3 = video.subclip(start_time_3, end_time_3)

# start_time_2 = 485  # Start time in seconds
# end_time_2 = 490  # End time in seconds
# clip2 = video.subclip(start_time_2, end_time_2)



# start_time_3 = 56  # Start time in seconds
# end_time_3 = 73  # End time in seconds
# clip3 = video.subclip(start_time_3, end_time_3)

# start_time_4 = 97  # Start time in seconds
# end_time_4 = 120  # End time in seconds
# clip4 = video.subclip(start_time_4, end_time_4)

# start_time_5 = 634  # Start time in seconds
# end_time_5 = 656  # End time in seconds
# clip5 = video.subclip(start_time_5, end_time_5)

# start_time_6 = 1164  # Start time in seconds
# end_time_6 = 1200  # End time in seconds
# clip6 = video.subclip(start_time_6, end_time_6)

# start_time_7 = 1210  # Start time in seconds
# end_time_7 = 1212  # End time in seconds
# clip7 = video.subclip(start_time_7, end_time_7)

# start_time_8 = 1214  # Start time in seconds
# end_time_8 = 1226  # End time in seconds
# clip8 = video.subclip(start_time_8, end_time_8)

# start_time_9 = 1261  # Start time in seconds
# end_time_9 = 1285  # End time in seconds
# clip9 = video.subclip(start_time_9, end_time_9)

# start_time_10 = 1286  # Start time in seconds
# end_time_10 = 1288  # End time in seconds
# clip10 = video.subclip(start_time_10, end_time_10)

# start_time_11 = 1291  # Start time in seconds
# end_time_11 = 1326  # End time in seconds
# clip11 = video.subclip(start_time_11, end_time_11)

final_clip = concatenate_videoclips([ clip1, clip4, clip2, clip3 ])

# clip3, clip4, clip5, clip6, clip7, clip8, clip9, clip10, clip11






output_path = "krumpnuski.mp4"
final_clip.write_videofile(output_path)