import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

// Debate service to handle audio file upload and send it to FastAPI for transcription
const debateService = asyncHandler(async (req, res) => {
  console.log(req.file); // Debugging line to check if the file is being uploaded

  const audioPath = req.file?.path;

  if (!audioPath) {
    return res.status(400).json({
      success: false,
      message: "No audio file uploaded",
    });
  }

  try {
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(audioPath));

    // Send audio to Flask server for transcription and Gemini response
    const response = await axios.post(
      "http://localhost:5000/transcribe", // Flask server URL
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Extract the transcription and reply from the Flask response
    const { transcription, reply } = response.data;

    // Send the transcription and reply back to the client
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { transcription, reply },
          "Debate response generated successfully"
        )
      );
  } catch (error) {
    console.error("Error during transcription:", error);

    // Send a structured error response if transcription fails
    const errorMessage =
      error.response?.data || error.message || "Unknown error";

    return res.status(500).json({
      success: false,
      message: "Failed to process the audio",
      errors: errorMessage,
    });
  } finally {
    // Clean up uploaded file only if it exists
    if (audioPath && fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }
  }
});

export { debateService };
