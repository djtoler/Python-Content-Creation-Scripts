#!/bin/bash

#Link to YouTube video
yt_video_link="$1"

#What to rename the file
new_name="$2"

#Download mp3 from YouTube
yt-dlp -x --audio-format mp3 "$yt_video_link"

#Rename the downloaded mp3 file
mv *.mp3 "$new_name.mp3"

#Move the file into mp3s directory (this will be the input audop path in the prepTrainingData script)
mv "$new_name.mp3" /home/ubuntu/audio_files/mp3s/
