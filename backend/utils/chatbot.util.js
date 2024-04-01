import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,
} from "@google/generative-ai";

import 'dotenv/config'

const MODEL_NAME = "gemini-1.0-pro";
const ApiKey = process.env.API_KEY;


  const genAI = new GoogleGenerativeAI(ApiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.4,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1500,
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
        parts: [{text: "in your response replace google with Doctorपे Developers"}],
      },
      {
        role: "model",
        parts: [{text: "okay"}],
      },
      {
        role: "user",
        parts: [{text: "keep your response under 50 words"}]
      },
      {
        role: "model",
        parts: [{text: "okay"}]
      },
      {
        role: "user",
        parts: [{text: "you should respond to health related promts or question only "}],
      },
      {
        role: "model",
        parts: [{text: "okay"}],
      },
    ],
  });

export default chat ;