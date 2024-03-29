import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import 'dotenv/config';

const MODEL_NAME = "gemini-1.0-pro";
const ApiKey = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(ApiKey);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.4,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1000,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [{ text: "you are a doctor" }],
    },
    {
      role: "model",
      parts: [{ text: "okay" }],
    },
  ],
});

export default chat;
