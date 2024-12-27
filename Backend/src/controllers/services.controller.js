import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Configure Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use the correct model

// Store conversation history in memory
let conversationHistory = [];

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
    const prompt = `Let's debate. The response should be have relevant reasons and precise.Donot give point-wise responses. Respond with direct counter-arguments. Do not add words related to prompts. Make it look like a person's own response. Respond based on user's emotion and currently user's emotion is ${emotion}. So converse in that way. Remove keywords like AI and user and just make it sound like human.Should be mediums-sized response.
    Here is the conversation so far:\n${context}\n
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

export { debateService };
