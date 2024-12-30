from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from emotion_recognition import detect_emotion

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/emotion-detection', methods=['POST'])
def emotion_detection():
    # Check if 'transcription' is in the request
    if 'transcription' not in request.json:
        return jsonify({'error': 'No transcription provided'}), 400

    transcription = request.json['transcription']  # Get the transcription text from the request
    try:
        # Get the emotion using the detect_emotion function
        emotion = detect_emotion(transcription)
        return jsonify({'emotion': emotion})
    except Exception as e:
        # Log the error and return a default emotion
        print(f"Error: {str(e)}")
        return jsonify({'emotion': 'neutral'})

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Set environment variables to reduce TensorFlow logs and warnings
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
    os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN custom operations for compatibility

    app.run(debug=True)
