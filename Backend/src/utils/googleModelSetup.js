// googleModelSetup.js
import * as GenerativeAI from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const model = new GenerativeAI.GenerativeLanguage({
  apiKey: process.env.GOOGLE_API_KEY,
});

export { model };
