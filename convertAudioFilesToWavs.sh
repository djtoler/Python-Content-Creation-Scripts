
# convert a single file
ffmpeg -i ak.m4a ak1.wav

# convert multiple files(make sure files are in the same directory)
for file in *.mp3; do ffmpeg -i "$file" -acodec pcm_s16le -ar 44100 "${file%.m4a}.wav"; done

# move all wav files to a new directory
# mkdir ak_tune && mv *.wav ak_tune/

