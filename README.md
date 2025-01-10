# VoxDebate - AI Debate Platform

VoxDebate is an innovative AI-powered debate platform built on the **MERN Vite Stack**. It leverages advanced technologies, including Hugging Face's AI models and Google Gemini Pro, to create a seamless and intelligent debating experience. With its user-friendly interface, VoxDebate transforms the way users engage in meaningful discussions.

---

## 🚀 Features

### 🎙️ Voice Input and Emotion Analysis
- **Voice Recording**: Uses `react-speech-recognition` to record and transcribe speech in real-time.
- **Emotion Detection**: Integrates Hugging Face's [HuBERT Large Model](https://api-inference.huggingface.co/models/superb/hubert-large-superb-er) for voice sentiment analysis.
- **Emotion Display**: Displays the detected emotion alongside the AI's response.

### 📝 Real-Time Text Editing
- Users can edit the transcribed text before sending it to the AI for more precise interactions.

### 💬 Vox Debate Playground
- A chat-like interface designed for dynamic, engaging conversations with AI.
- Powered by **Google Gemini Pro** for intelligent and context-aware responses.

### 🌗 Dark and Light Mode
- Seamless integration using Redux Toolkit.

### 🎨 Responsive and Beautiful Design
- Built with **Tailwind CSS** and **shadcn-ui** for a polished user experience.
- Smooth transitions and animations powered by `framer-motion`.

### 🔒 Secure and Scalable Backend
- **User Authentication**: Managed using Context API and `jsonwebtoken`.
- **File Handling**: `multer` is used for handling uploads.
- **Database**: MongoDB and Mongoose provide robust data management.

### 📢 Notifications
- Instant feedback with `react-toastify`.

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/VoxDebate.git
   ```

2. Navigate to the project directory:
   ```bash
   cd VoxDebate
   ```

3. Install dependencies:
   - Frontend
   ```
   cd Frontend
   npm install
   npm i framer-motion lucide-react react react-dom react-icons react-redux react-router-dom react-speech-recognition react-toastify wav-encoder
   ```
   - Backend
   ```
   cd Backend
   npm install
   npm i @google/generative-ai axios bcrypt concurrently cookie-parser cors dotenv express jsonwebtoken mongodb mongoose multer nodemon prettier
   ```
4. Set up environment variables:
   









  

