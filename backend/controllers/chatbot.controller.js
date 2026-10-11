import mongoose from "mongoose";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../model/product.model.js";
import { askHealthChat, suggestChatActions } from "../utils/chatbot.util.js";

const buildCatalogHint = async (message) => {
    if (mongoose.connection.readyState !== 1) return "";

    const lower = message.toLowerCase();
    const wantsCatalog =
        /medicine|tablet|pharmacy|pain|headache|fever|cold|cough|skin|buy|order|relief/.test(
            lower
        );
    if (!wantsCatalog) return "";

    const keywords = [];
    if (/headache|pain/.test(lower)) keywords.push(/ibuprofen|pain/i);
    if (/fever|cold/.test(lower)) keywords.push(/fever|cetirizine|vitamin/i);
    if (/skin|acne|allerg/.test(lower)) keywords.push(/cetirizine|cream|skin/i);

    let query = {};
    if (keywords.length) {
        query = { $or: keywords.map((rx) => ({ title: rx })) };
    }

    const products = await Product.find(query).select("title price description").limit(6).lean();
    const list = products.length ? products : await Product.find().select("title price description").limit(6).lean();

    if (!list.length) return "";

    return list
        .map((p) => `- ${p.title} (₹${p.price}): ${String(p.description).slice(0, 100)}`)
        .join("\n");
};

export const chatbot = AsyncHandler(async (req, res) => {
    const { message, history } = req.body;

    if (!message?.trim()) {
        return res.status(400).json({ message: "" });
    }

    if (!process.env.GROQ_API_KEY) {
        return res.status(503).json({
            message: "Chat is unavailable. Set GROQ_API_KEY on the server.",
        });
    }

    const catalogHint = await buildCatalogHint(message);
    const cleanedText = await askHealthChat(message, history || [], catalogHint);
    const actions = suggestChatActions(message);

    res.json({ message: cleanedText, actions });
});
