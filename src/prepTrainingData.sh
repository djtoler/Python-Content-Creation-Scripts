#!/bin/bash

#Bucket name for files stored in variable
bucket_name="$1"

#Input source file and speaker identification file stored in variables
original_audio_path="$2"
python_script_path="./identifySpeakers.py"

#Extract the filename without the extension
filename_with_extension=$(basename "$original_audio_path")
data_label="${filename_with_extension%.*}"

#Store new mp3 in variable
output_audio_path="./output_audio.mp3"

#Store future wav file in variable
output_wav_path="/home/ubuntu/audio_files/output_audio.wav"

#Run speaker identification file
python "$python_script_path" "$original_audio_path"

#Convert mp3 output to wav
ffmpeg -i "$output_audio_path" "$output_wav_path"

#Extract vocals from wav file
demucs --two-stems=vocals /home/ubuntu/audio_files/"$output_wav_path"

#Move into the directory where demucs will store the extracted vocals wav file
cd /home/ubuntu/audio_files/separated/htdemucs/output_audio

#Move that wav file to the wavs directory
mv ./output_audio.wav /home/ubuntu/audio_files/wavs/output_audio.wav

#Move to the location of the scripts
cd /home/ubuntu/video_scripts/Python-Content-Creation-Scripts/src

#Run file to slice wavs into 5 second intervals
python sliceWavFiles.py

#Move into directory with sliced wavs
cd /home/ubuntu/audio_files/split_wavs/

#Create s3 bucket and upload wav files
aws s3api create-bucket --bucket "$bucket_name" --region us-east-1 --acl public-read-write --output json
aws s3api wait bucket-exists --bucket "$bucket_name"
aws s3 sync /home/ubuntu/audio_files/split_wavs/ s3://"$bucket_name"
