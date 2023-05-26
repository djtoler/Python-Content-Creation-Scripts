import requests
import json
import time
from pydub import AudioSegment
import os

original_audio_path = "./jrjp.mp3"
output_audio_path = "./output_audio.mp3"

base_url = "https://api.assemblyai.com/v2"

headers = {"authorization": "3d29a15fd2b44b3c918463dafd64bbee"}

with open(original_audio_path, "rb") as f:
    response = requests.post(base_url + "/upload",
                             headers=headers,
                             data=f)

upload_url = response.json()["upload_url"]

data = {
    "audio_url": upload_url,
    "speaker_labels": True
}

url = base_url + "/transcript"
response = requests.post(url, json=data, headers=headers)

transcript_id = response.json()['id']
polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

while True:
    transcription_result = requests.get(polling_endpoint, headers=headers).json()

    if transcription_result['status'] == 'completed':
        transcript_text = transcription_result['text']
        utterances = transcription_result['utterances']

        segments = []
        for utterance in utterances:
            speaker = utterance['speaker']
            start = utterance['start']
            end = utterance['end']
            print(f"Speaker {speaker}: {start} - {end}")
            if speaker == 'A':
                segment = {
                    'start': start,
                    'end': end
                }
                segments.append(segment)

        original_audio = AudioSegment.from_file(original_audio_path, format="mp3")
        output_audio = AudioSegment.empty()

        for segment in segments:
            start_time = segment["start"] 
            end_time = segment["end"] 
            segment_audio = original_audio[start_time:end_time]
            output_audio += segment_audio

        output_audio.export(output_audio_path, format="mp3")

        # Save the output audio file to the current working directory
        output_audio_path = os.path.join(os.getcwd(), output_audio_path)
        output_audio.export(output_audio_path, format="mp3")

        break

    elif transcription_result['status'] == 'error':
        raise RuntimeError(f"Transcription failed: {transcription_result['error']}")

    else:
        time.sleep(3)
