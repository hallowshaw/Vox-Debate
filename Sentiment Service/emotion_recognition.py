import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Ensure the necessary NLTK data is downloaded (run this if needed)
nltk.download('punkt')
nltk.download('stopwords')

# Load the trained model
model = load_model('emotion_recognizer.h5')  # Use your actual model file

# Load the tokenizer (you should have saved this during training)
with open('tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

maxlen = 100  # Max length of the input text sequences

# Emotion labels (adjust according to your model's training)
emotion_labels = ['angry', 'fear', 'happy', 'love', 'sad', 'surprised']

# Preprocess the input text: tokenization, stopword removal, and punctuation handling
def preprocess_texts(texts):
    stop_words = set(stopwords.words('english'))
    preprocessed_texts = []

    for txt in texts:
        words = word_tokenize(txt.lower())  # Tokenize and convert to lowercase
        filtered_txt = [word for word in words if word not in stop_words and word not in string.punctuation]
        preprocessed_texts.append(' '.join(filtered_txt))
    
    return preprocessed_texts

# Function to detect emotion from a given text input
def detect_emotion(text):
    # Preprocess the text
    preprocessed_text = preprocess_texts([text])

    # Convert the preprocessed text into a sequence of tokens
    seq = tokenizer.texts_to_sequences(preprocessed_text)
    padded_seq = pad_sequences(seq, maxlen=maxlen)

    # Predict the emotion from the model
    prediction = model.predict(padded_seq)
    emotion_index = np.argmax(prediction, axis=1)[0]

    # Return the corresponding emotion label
    return emotion_labels[emotion_index]
