import os
from pydub import AudioSegment

# Input directory containing wav files
input_dir = "/home/ubuntu/audio_files/wavs/"

# Output directory to save 5-second segments
output_dir = "/home/ubuntu/audio_files/split_wavs/"

# Loop through each wav file in input directory
for filename in os.listdir(input_dir):
    if filename.endswith(".wav"):
        # Load the audio file
        audio = AudioSegment.from_wav(os.path.join(input_dir, filename))
        
        # Split the audio file into 5-second segments
        segment_length = 5000  # milliseconds
        segments = audio[::segment_length]
        
        # Save each segment to output directory
        for i, segment in enumerate(segments):
            segment.export(os.path.join(output_dir, f"{filename}_{i}.wav"), format="wav")
