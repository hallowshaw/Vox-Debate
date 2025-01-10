import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";

dotenv.config();

// Configure Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use the correct model

// Store conversation history in memory
let conversationHistory = [];

// Hugging Face API details
const HF_API_URL =
  "https://api-inference.huggingface.co/models/superb/hubert-large-superb-er";
const headers = { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` };

// Mapping of emotion labels to full forms
const EMOTION_MAP = {
  hap: "Happy",
  ang: "Angry",
  sad: "Sad",
  neu: "Neutral",
};

// Helper function to detect emotion from audio
const detectEmotion = async (filePath) => {
  try {
    const fileStream = fs.createReadStream(filePath);

    while (true) {
      const response = await axios.post(HF_API_URL, fileStream, { headers });
      const result = response.data;

      if (result.error && result.error.includes("loading")) {
        const estimatedTime = result.estimated_time || 60;
        await new Promise((resolve) =>
          setTimeout(resolve, estimatedTime * 1000)
        );
      } else {
        // Find the emotion with the highest score and return it
        const maxEmotion = result.reduce((prev, curr) =>
          prev.score > curr.score ? prev : curr
        );
        return EMOTION_MAP[maxEmotion.label] || "Unknown";
      }
    }
  } catch (error) {
    console.error("Error during emotion detection:", error.message);
    return "Unknown";
  }
};

// Helper function to filter AI responses and make them concise
const filterResponse = (responseText) => {
  return responseText.trim().replace(/\*\*/g, "").replace(/\*/g, "");
};

// Function to summarize older history if it gets too long
const summarizeHistory = (history) => {
  if (history.length > 10) {
    const summarized =
      "Summary of earlier discussion: " + history.slice(0, -10).join(" ");
    return [summarized].concat(history.slice(-10));
  }
  return history;
};

// Function to get Gemini response with context
const getGeminiResponse = async (question, emotion = "neutral") => {
  try {
    // Add the user's question to the history
    conversationHistory.push(`User: ${question}`);

    // Summarize older history if needed
    conversationHistory = summarizeHistory(conversationHistory);

    // Build the context from the conversation history
    const context = conversationHistory.join("\n");

    // Adjust the prompt to focus on debate and conciseness
    const prompt = `Let's debate. The response should be have relevant reasons and should be precise. Do not give point-wise responses. Respond with direct counter-arguments. Do not add words related to prompts. Make it look like a person's own response. Please respond after taking into account user's emotion and currently user's emotion says he/she is ${emotion}. Do not specify through answers that you understand the emotions just customize answers considering those emotions. So converse in that way conidering above points. Remove keywords like AI and user and just make it sound like human.Should be small-sized response.
    Here is the conversation so far to give idea of previous discussions :\n${context}\n
    User: ${question}\n
    AI:`;

    console.log("Context sent to Gemini:", context); // Log context for debugging

    // Generate the response using Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Debugging: Log the response data
    console.log("Response from Gemini API:", response);

    // Filter and return the response
    const aiResponse = filterResponse(response);

    // Add the AI's response to the history
    conversationHistory.push(`AI: ${aiResponse}`);

    return aiResponse;
  } catch (error) {
    console.error("Error during Gemini response generation:", error);
    return `Sorry, I couldn't generate a response at the moment on this statement. Please try again with something else.`;
  }
};

// Debate service to handle transcribed text and send it to Gemini API for response
const debateService = asyncHandler(async (req, res) => {
  const { transcription, emotion } = req.body;

  if (!transcription) {
    return res.status(400).json({
      success: false,
      message: "No transcription provided",
    });
  }

  try {
    // Get AI response
    const aiResponse = await getGeminiResponse(transcription, emotion);

    // Send the transcription and AI response back to the client
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { transcription, reply: aiResponse },
          "Debate response generated successfully"
        )
      );
  } catch (error) {
    console.error("Error during transcription processing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process the transcription",
      errors: error.message || "Unknown error",
    });
  }
});

// Emotion detection service to process an audio file and return the detected emotion
const emotionDetectionService = asyncHandler(async (req, res) => {
  const audioFile = req.file;

  if (!audioFile) {
    return res.status(400).json({
      success: false,
      message: "No audio file provided",
    });
  }

  try {
    // Detect emotion from the provided audio file
    const emotion = await detectEmotion(audioFile.path);

    // Delete the audio file after emotion detection
    fs.unlink(audioFile.path, (err) => {
      if (err) {
        console.error("Error deleting audio file:", err);
      } else {
        console.log("Audio file deleted successfully");
      }
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { emotion }, "Emotion detected successfully"));
  } catch (error) {
    console.error("Error during emotion detection:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to detect emotion",
      errors: error.message || "Unknown error",
    });
  }
});

export { debateService, emotionDetectionService };
