from pydub import AudioSegment

# Load the audio file
audio = AudioSegment.from_file("tdj.mp3", format="mp3")

# Set the start and end times in milliseconds
start_time = 0
end_time = 132000

# Slice the audio at the specified time range
sliced_audio = audio[start_time:end_time]

# Write the sliced audio to a new file
sliced_audio.export("tdj2.mp3", format="mp3")
