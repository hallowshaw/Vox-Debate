import numpy as np
import librosa
from tensorflow.keras.models import load_model

# Load the pre-trained model
model = load_model('emotion_model.h5')
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

def extract_features_from_audio(audio_path, duration=2.5, offset=0.6, sr=22050):
    # Load the audio file using librosa
    data, sr = librosa.load(audio_path, sr=sr, duration=duration, offset=offset)
    result = np.array([])

    # Extract features
    zcr = np.mean(librosa.feature.zero_crossing_rate(y=data).T, axis=0)
    result = np.hstack((result, zcr))

    chroma_stft = np.mean(librosa.feature.chroma_stft(S=np.abs(librosa.stft(data)), sr=sr).T, axis=0)
    result = np.hstack((result, chroma_stft))

    mfcc = np.mean(librosa.feature.mfcc(y=data, sr=sr).T, axis=0)
    result = np.hstack((result, mfcc))

    rms = np.mean(librosa.feature.rms(y=data).T, axis=0)
    result = np.hstack((result, rms))

    mel = np.mean(librosa.feature.melspectrogram(y=data, sr=sr).T, axis=0)
    result = np.hstack((result, mel))

    return result

def detect_emotion(audio):
    temp_audio_path = 'temp_audio.wav'
    with open(temp_audio_path, 'wb') as f:
        f.write(audio.read())

    # Extract features
    features = extract_features_from_audio(temp_audio_path)
    features = np.expand_dims(features, axis=0)

    # Predict emotion
    predictions = model.predict(features)
    emotion_classes = ['neutral', 'calm', 'happy', 'sad', 'angry', 'fear', 'disgust', 'surprise']
    detected_emotion = emotion_classes[np.argmax(predictions)]

    return detected_emotion
