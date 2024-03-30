import { AsyncHandler } from "../utils/AsyncHandler.js";
import chat from "../utils/chatbot.util.js";

let conversationHistory = [
    { role: "system", content: "You are a helpful assistant." },
];
export const chatbot = AsyncHandler( async (req , res) => {

    const {message} = req.body;

    conversationHistory.push({ role: "user", content: message });

    const result = await chat.sendMessage(message);
    const response =  result.response;
    const cleanedText = response.text().replace(/\*\*/g, '').replace(/\*/g, '');
    conversationHistory.push({ role: "assistant", content: cleanedText });

    res.json({ message: cleanedText });
    // try {

    // } catch (error) {
    //     console.error("Error calling OpenAI: ", error);
    //     res.status(500).send("Error generating response from OpenAI");
    // }
})