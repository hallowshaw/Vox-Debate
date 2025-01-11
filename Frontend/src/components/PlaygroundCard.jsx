import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaMicrophoneAlt,
  FaStop,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const PlaygroundCard = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [editableTranscription, setEditableTranscription] = useState("");
  const [emotion, setEmotion] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const chatContainerRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecordingInProgress, setIsRecordingInProgress] = useState(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [messages]);

  useEffect(() => {
    setEditableTranscription(transcript);
  }, [transcript]);

  const startRecording = async () => {
    if (isRecording) return;

    if (!browserSupportsSpeechRecognition) {
      setError("Your browser does not support speech recognition.");
      return;
    }

    setIsRecording(true);
    setError("");
    resetTranscript();
    setEditableTranscription("");

    SpeechRecognition.startListening({ continuous: true });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(blob);
      setIsRecordingInProgress(false);
    };

    mediaRecorder.start();

    setIsRecordingInProgress(true);

    setTimeout(() => {
      mediaRecorder.stop();
    }, 10000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();

    setError("");
  };

  const speakText = (text) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  const handleUpload = async () => {
    if (!editableTranscription || !audioBlob) {
      return;
    }

    // Add the edited transcription to the messages state
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "User", text: editableTranscription },
    ]);

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", audioBlob, "userAudio.wav");

    try {
      const emotionRes = await fetch(
        "http://localhost:8000/api/v1/services/emotion-detection",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      let detectedEmotion = "neutral";
      if (emotionRes.ok) {
        const emotionData = await emotionRes.json();
        detectedEmotion = emotionData.data.emotion;
      } else {
        console.warn("Emotion API response error: Defaulting to neutral.");
      }

      setEmotion(detectedEmotion);

      setTimeout(() => {
        setEmotion("");
      }, 4000);

      const debateFormData = new FormData();
      debateFormData.append("transcription", editableTranscription);
      debateFormData.append("emotion", detectedEmotion);

      setIsTyping(true);
      const typingPhrases = [
        "Analyzing your argument...",
        "Formulating a logical response...",
        "Processing your thoughts...",
        "Evaluating your perspective...",
        "Constructing a coherent reply...",
        "Synthesizing relevant points...",
        "Reflecting on your input...",
        "Considering counterarguments...",
        "Weighing possible responses...",
        "Delving into your reasoning...",
        "Breaking down key ideas...",
        "Exploring your argument in depth...",
        "Thinking critically about your points...",
        "Organizing a thoughtful response...",
        "Drafting a reply tailored to your input...",
        "Carefully reviewing your statement...",
        "Assessing the nuances of your message...",
        "Generating an appropriate rebuttal...",
        "Examining your argument holistically...",
        "Preparing a detailed response...",
      ];

      for (let phrase of typingPhrases) {
        setTypingText(phrase);
        chatContainerRef.current?.scrollTo(
          0,
          chatContainerRef.current.scrollHeight
        );
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsTyping(false);

      const debateRes = await fetch(
        "http://localhost:8000/api/v1/services/debate",
        {
          method: "POST",
          body: debateFormData,
          credentials: "include",
        }
      );

      if (!debateRes.ok) throw new Error(`Error: ${debateRes.statusText}`);

      const debateData = await debateRes.json();
      const aiResponse = debateData.data.reply || "No reply available.";

      speakText(aiResponse);

      setMessages((prev) => [...prev, { sender: "AI", text: "" }]);

      let index = 0;
      const typingSpeed = 65;
      const typingInterval = setInterval(() => {
        if (index < aiResponse.length) {
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              sender: "AI",
              text: aiResponse.slice(0, index + 1),
            };
            return updatedMessages;
          });
          chatContainerRef.current?.scrollTo(
            0,
            chatContainerRef.current.scrollHeight
          );
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      setEditableTranscription("");
    } catch (err) {
      console.error("Error submitting text:", err);
      setError("Failed to submit text. Please try again later.");
      setIsTyping(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-[900px] h-[85vh] flex flex-col rounded-3xl shadow-2xl mx-auto p-4 space-y-4 sm:p-8 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#18181b] to-[#1f1f25] text-white"
          : "bg-gradient-to-br from-white to-gray-100 text-gray-800"
      } overflow-hidden`} // Prevents overflow
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl font-extrabold text-center mb-6 leading-tight bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text drop-shadow-md"
      >
        Vox Debate Playground
      </motion.h1>
      <motion.div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-6 space-y-4 rounded-2xl shadow-inner ${
          theme === "dark" ? "bg-[#202024]" : "bg-gray-50"
        } lg:w-full sm:mx-auto border ${
          theme === "dark" ? "border-[#2e2e3e]" : "border-gray-200"
        }`}
        style={{
          maxHeight: "calc(100% - 150px)", // Subtracts space for other elements
          overflowY: "auto", // Enables vertical scrolling
        }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-2xl shadow-md ${
                msg.sender === "User"
                  ? "bg-gradient-to-r from-indigo-400 to-blue-500 text-white"
                  : "bg-gradient-to-r from-gray-300 to-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="text-sm italic text-gray-400 flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>{typingText}</span>
          </motion.div>
        )}
      </motion.div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {emotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center text-xl font-semibold text-green-400"
        >
          User's emotion detected: {emotion}
        </motion.div>
      )}

      <div className="flex items-center space-x-4 mt-6">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className="flex-shrink-0 p-4 bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
        >
          {isRecording ? <FaStop /> : <FaMicrophoneAlt />}
        </Button>

        <textarea
          value={editableTranscription}
          onChange={(e) => setEditableTranscription(e.target.value)}
          className={`flex-grow p-4 rounded-xl resize-none shadow-md border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform ${
            theme === "dark"
              ? "bg-[#1f1f25] text-white placeholder-gray-400 border-[#2e2e3e]"
              : "bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300"
          }`}
          placeholder="Type or speak your message..."
          rows={3}
        />

        <Button
          onClick={handleUpload}
          className={`flex-shrink-0 p-4 bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 ${
            isUploading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={isRecordingInProgress || isUploading}
        >
          {isUploading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaPaperPlane />
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaygroundCard;
