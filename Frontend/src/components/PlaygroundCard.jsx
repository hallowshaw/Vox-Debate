import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMicrophoneAlt, FaStop, FaPaperPlane } from "react-icons/fa";
import WavEncoder from "wav-encoder";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PlaygroundCard = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [liveTranscription, setLiveTranscription] = useState("");
  const [editableTranscription, setEditableTranscription] = useState(""); // For editing
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Typing animation
  const [typingText, setTypingText] = useState("");
  const mediaRecorderRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const theme = useSelector((state) => state.theme.theme);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [messages]);

  const startRecording = () => {
    if (isRecording) return;

    setIsRecording(true);
    setError("");
    setLiveTranscription("");
    setEditableTranscription(""); // Reset editable transcription

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

        mediaRecorder.onstop = () => {
          const webmBlob = new Blob(chunks, { type: "audio/webm" });
          setAudioBlob(webmBlob);
        };

        mediaRecorder.start();

        // Start live transcription
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join("");
            setLiveTranscription(transcript);
            setEditableTranscription(transcript);
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
        }
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
        setError("Unable to access microphone. Please check permissions.");
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    setIsRecording(false);

    // Stop media recorder
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;

    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
    }

    // Preserve live transcription
    if (editableTranscription) {
      setMessages((prev) => [
        ...prev,
        { sender: "User", text: editableTranscription },
      ]);
    }
  };

  const handleUpload = async () => {
    if (!audioBlob) {
      setError("Please record audio before submitting.");
      return;
    }

    try {
      const wavBlob = await convertWebMToWav(audioBlob);

      const formData = new FormData();
      formData.append("audio", wavBlob, "recorded-audio.wav");
      formData.append("transcription", editableTranscription);

      const typingPhrases = [
        "Analyzing your argument...",
        "Formulating a logical response...",
        "Crafting a compelling rebuttal...",
        "Delving into the details...",
        "Processing your perspective...",
        "Weighing the merits of the argument...",
        "Constructing a solid point...",
        "Examining potential flaws in the logic...",
        "Assessing the counterpoints...",
        "Strengthening my stance...",
        "Strategizing a thoughtful reply...",
        "Synthesizing relevant facts...",
        "Exploring alternative viewpoints...",
        "Reflecting on the evidence...",
        "Gauging the validity of claims...",
        "Identifying gaps in reasoning...",
        "Revisiting the foundation of the debate...",
        "Reviewing critical aspects...",
        "Engaging with the nuances of the topic...",
        "Clarifying complex points...",
        "Evaluating the broader implications...",
        "Balancing objectivity with logic...",
        "Connecting arguments to evidence...",
        "Focusing on critical weaknesses...",
        "Highlighting overlooked points...",
        "Addressing contradictory perspectives...",
        "Preparing a concise response...",
        "Summarizing key arguments...",
        "Enhancing the clarity of the discussion...",
        "Integrating diverse perspectives...",
      ];

      const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      const shuffledPhrases = shuffleArray(typingPhrases);

      // Show typing effect
      setIsTyping(true);
      for (let i = 0; i < 4; i++) {
        setTypingText(shuffledPhrases[i]);
        chatContainerRef.current?.scrollTo(
          0,
          chatContainerRef.current.scrollHeight
        ); // Ensure scrolling
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsTyping(false);

      // Fetch the AI response
      const res = await fetch("http://localhost:8000/api/v1/services/debate", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      const data = await res.json();
      const aiResponse = data.data.reply || "No reply available.";

      // Simulate letter-by-letter typing for the AI response
      setMessages((prev) => [...prev, { sender: "AI", text: "" }]);

      let index = 0;
      const typingSpeed = 40; // Faster typing effect
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
          ); // Ensure scrolling
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      setAudioBlob(null);
      speakText(aiResponse);
      setEditableTranscription("");
    } catch (err) {
      console.error("Error submitting audio:", err);
      setError("Failed to submit audio. Please try again later.");
      setIsTyping(false);
    }
  };

  const simulateTypingEffect = (phrases, delay) => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(phrases[index]);
      index++;
      if (index >= phrases.length) clearInterval(interval);
    }, delay);
  };

  const convertWebMToWav = async (webmBlob) => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const wavData = await WavEncoder.encode({
      sampleRate: audioBuffer.sampleRate,
      channelData: [audioBuffer.getChannelData(0)], // Mono audio
    });

    return new Blob([wavData], { type: "audio/wav" });
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // You can set the language as needed
    window.speechSynthesis.speak(speech);
  };

  return (
    <motion.div
      className={`w-full max-w-[900px] h-[85vh] flex flex-col rounded-2xl shadow-2xl mx-auto p-6 transition-all duration-300 ease-in-out ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#1e1e2f] to-[#29293d] text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-black"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Vox Debate Playground text */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-orange-500 drop-shadow-md">
        Vox Debate Playground
      </h1>

      <div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 rounded-lg bg-opacity-50 shadow-inner transition-all duration-300 ease-in-out ${
          theme === "dark" ? "bg-[#2e2e3e]" : "bg-gray-200"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-xl shadow ${
                msg.sender === "User"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  : "bg-gradient-to-br from-gray-300 to-gray-400 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Effect */}
        {isTyping && (
          <motion.div
            className="text-sm italic text-gray-500 transition-opacity duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {typingText}
          </motion.div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Mobile responsive layout */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
        <textarea
          value={editableTranscription}
          onChange={(e) => setEditableTranscription(e.target.value)}
          className={`w-full sm:w-auto flex-grow p-4 rounded-md transition-all duration-300 ease-in-out resize-none shadow-md border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            theme === "dark"
              ? "bg-[#2b2b3d] text-white placeholder-gray-400 border-[#3c3c4d]"
              : "bg-gray-100 text-black placeholder-gray-600 border-gray-300"
          }`}
          placeholder="Yes, we type what you say..."
          rows={3}
        />

        <div className="flex space-x-4">
          <Button
            onClick={handleUpload}
            className="p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            <FaPaperPlane />
          </Button>

          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            {isRecording ? <FaStop /> : <FaMicrophoneAlt />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaygroundCard;
