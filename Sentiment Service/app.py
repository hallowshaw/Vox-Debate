from flask import Flask, request, jsonify
from flask_cors import CORS
from emotion_recognition import detect_emotion
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/emotion-detection', methods=['POST'])
def emotion_detection():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    try:
        emotion = detect_emotion(audio_file)
        return jsonify({'emotion': emotion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Set environment variables to reduce TensorFlow logs and warnings
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
    os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN custom operations for compatibility

    app.run(debug=True)
