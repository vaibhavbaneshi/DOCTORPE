import { ChatGroq } from "@langchain/groq";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const SYSTEM_PROMPT = `You are DoctorPe's health assistant inside a telehealth and pharmacy app.

Goals:
- Be calm, clear, and helpful. Use plain language (about 80–120 words when needed).
- Answer health-related questions only.
- You must NOT diagnose, prescribe, or tell users exactly what to buy. You may describe common OTC categories (e.g. acetaminophen, ibuprofen) and when to see a clinician.
- When the user asks about symptoms like headache, fever, or pain, combine general safety guidance with relevant items from the CATALOG section if provided. Phrase as "You may find options in our Medicines section such as …" — never as a personal prescription.
- Red flags (severe/sudden headache, neuro symptoms, pregnancy, chest pain): urge urgent or in-person care.
- Point users to app features: Medicines (/medicines), book a doctor (/bookDoctor), AI Lab screenings (/AI_Lab).
- Never mention Google or "DoctorPe Developers". Say "DoctorPe" or "our care team".
- Do not use markdown bold or asterisks.`;

let model;

const getModel = () => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not configured");
    }
    if (!model) {
        model = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY,
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            temperature: 0.35,
            maxTokens: 512,
        });
    }
    return model;
};

export const askHealthChat = async (message, history = [], catalogHint = "") => {
    const llm = getModel();
    const system = catalogHint
        ? `${SYSTEM_PROMPT}\n\nCATALOG (from DoctorPe pharmacy — reference only):\n${catalogHint}`
        : SYSTEM_PROMPT;

    const prior = history
        .filter((entry) => entry?.role && entry?.content)
        .slice(-8)
        .map((entry) =>
            entry.role === "user"
                ? new HumanMessage(entry.content)
                : new AIMessage(entry.content)
        );

    const result = await llm.invoke([
        new SystemMessage(system),
        ...prior,
        new HumanMessage(message.trim()),
    ]);

    const text =
        typeof result.content === "string"
            ? result.content
            : Array.isArray(result.content)
              ? result.content.map((part) => part.text ?? "").join("")
              : String(result.content ?? "");
    return text.replace(/\*\*/g, "").replace(/\*/g, "");
};

export const suggestChatActions = (message) => {
    const lower = message.toLowerCase();
    const actions = [];

    if (/medicine|tablet|pharmacy|ibuprofen|cetirizine|pain|headache|fever|buy|order/.test(lower)) {
        actions.push({ label: "Browse medicines", href: "/medicines" });
    }
    if (/doctor|appointment|book|clinic|specialist|consult/.test(lower)) {
        actions.push({ label: "Find a doctor", href: "/bookDoctor" });
    }
    if (/diabetes|heart|stress|screen|risk|ai lab/.test(lower)) {
        actions.push({ label: "Open AI Lab", href: "/AI_Lab" });
    }
    if (actions.length === 0) {
        actions.push({ label: "Browse medicines", href: "/medicines" });
    }
    return actions.slice(0, 3);
};
