from pytube import YouTube
from moviepy.editor import *
import os
import shutil
from pydub import AudioSegment
import time

counter =0

video_ids = ["V_cOVwXEzJ4", "M4k435jeQ5k", "A0eBAqLrk4c"]

# Create a directory to save the WAV files
if not os.path.exists("d_akademiks_wav_files"):
    os.makedirs("d_akademiks_wav_files")

# Loop through each video ID and download the video
for video_id in video_ids:
    try:
        # Create a YouTube object
        video_url = f'https://www.youtube.com/watch?v={video_id}'
        yt = YouTube(video_url)

        # Print video details
        print('Title:', yt.title)
        print('Length:', yt.length, 'seconds')
        print('Rating:', yt.rating)
        print('Views:', yt.views)

        # Download the highest resolution video
        stream = yt.streams.get_highest_resolution()
        if stream:
            print(f'Downloading video {video_id}...')
            stream.download()
            print(f'Download of video {video_id} complete.')

            default_filename = stream.default_filename
            new_filename = f'{video_id}.mp4'
            os.rename(default_filename, new_filename)

            # Convert MP4 to WAV
            wav_file = f"{video_id}.wav"
            video = VideoFileClip(new_filename)
            video.audio.write_audiofile(wav_file)
            print(f'Conversion of video {video_id} to WAV complete.')

            #close 'VideoFileClip object from MoviePy library bc you cant delete mp4s if object is still open for writing
            video.reader.close()
            video.audio.reader.close_proc()

        else:
            print(f'No stream found for video {video_id}.')

    except Exception as e:
        print(f'Error downloading or converting video {video_id}: {str(e)}')

# Chop and Move all WAV files to the wav_files directory

for file in os.listdir():
    if file.endswith(".wav"):
        shutil.move(file, f"d_akademiks_wav_files/{file}")
        print(f'Moved {file} to d_akademiks_wav_files directory')

for file in os.listdir():
    if file.endswith(".mp4"):
        os.remove(file)
        print(f'Deleted MP4 file {file}')

time.sleep(10)

# Create a new directory for sliced WAV files
if not os.path.exists("d_akademiks_wav_files_slices"):
    os.makedirs("d_akademiks_wav_files_slices")

if not os.path.exists("d_akademiks_wav_files_slices_"):
    os.makedirs("d_akademiks_wav_files_slices_")

# Slice all the WAV files
wav_files_directory = "d_akademiks_wav_files"  # Directory path where WAV files are located
slices_directory = "d_akademiks_wav_files_slices_"  # Directory path to save sliced WAV files

for file in os.listdir(wav_files_directory):
    if file.endswith(".wav"):
        print(f'Slicing {file}...')
        wav_file = AudioSegment.from_wav(os.path.join(wav_files_directory, file))  # Provide full path of WAV file
        duration = len(wav_file)  # Get duration of WAV file in milliseconds
        num_slices = duration // 5000  # Calculate number of 5-second slices
        for i in range(num_slices):
            start_time = i * 5000  # Start time of slice in milliseconds
            end_time = start_time + 5000  # End time of slice in milliseconds
            sliced_wav_files = wav_file[start_time:end_time]  # Slice WAV file
            sliced_wav_file_name = f"akademiks{file[:-4]}_{counter:03d}_slice.wav"  # Add counter as unique identifier to original filename
            sliced_wav_files.export(os.path.join(slices_directory, sliced_wav_file_name), format="wav")  # Provide full path of output sliced WAV file
            print(f'Sliced {file} (Slice {i+1} of {num_slices}) and saved as {sliced_wav_file_name}.')
            counter += 1  # Increment counter


# Move sliced WAV files to the new directory
for file in os.listdir():
    if file.endswith("_slice.wav"):
        shutil.move(file, f"d_akademiks_wav_files_slices/{file}")
        print(f'Moved {file} to d_akademiks_wav_files_slices directory')

#___________________________________________________________________________________

