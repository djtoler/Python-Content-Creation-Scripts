from pyAudioAnalysis import audioBasicIO, audioSegmentation

[Fs, x] = audioBasicIO.read_audio_file("boosie.wav")

segments = audioSegmentation.speaker_diarization("boosie.wav", 2)

for i, segment in enumerate(segments):
    speaker_id = segment[2]
    start_time = segment[0]
    end_time = segment[1]
    segment_file = "speaker_" + str(speaker_id) + "_" + str(i) + ".wav"
    audioBasicIO.cut_audio_file("boosie.wav", segment_file, start_time, end_time)