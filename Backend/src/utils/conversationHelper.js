// src/utils/conversationHelper.js

// Array to store the conversation history
let conversationHistory = [];

/**
 * Summarizes the conversation history to keep the context manageable.
 * @param {Array} history - The conversation history array.
 * @returns {Array} - A summarized version of the conversation history.
 */
const summarizeHistory = (history) => {
  // Simple summarization: you can add more sophisticated logic here if needed
  return history.slice(-5); // Keeps only the last 5 exchanges for brevity
};

/**
 * Filters the AI response (e.g., removes inappropriate content).
 * @param {String} response - The AI-generated response.
 * @returns {String} - The filtered response.
 */
const filterResponse = (response) => {
  // Placeholder filtering logic - refine based on actual use case
  return response.replace(/badword/g, "****");
};

export { conversationHistory, summarizeHistory, filterResponse };
