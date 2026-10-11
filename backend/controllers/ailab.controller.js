import { AsyncHandler } from "../utils/AsyncHandler.js";
import { explainScreeningResult, runScreeningIntake } from "../utils/ailab.agent.js";

export const screeningIntake = AsyncHandler(async (req, res) => {
    const { screening, collected, message, profileContext } = req.body;

    if (!screening || !["diabetes", "stress"].includes(screening)) {
        return res.status(400).json({
            status: false,
            message: "screening must be diabetes or stress",
        });
    }

    if (!process.env.GROQ_API_KEY) {
        return res.status(503).json({
            status: false,
            message: "AI intake is unavailable. Set GROQ_API_KEY on the server.",
        });
    }

    const result = await runScreeningIntake({
        screening,
        collected: collected || {},
        userMessage: message || "",
        profileContext: profileContext || null,
    });

    res.json({ status: true, ...result });
});

export const screeningExplain = AsyncHandler(async (req, res) => {
    const { screening, result: mlResult } = req.body;

    if (!screening || mlResult === undefined || mlResult === null) {
        return res.status(400).json({
            status: false,
            message: "screening and result are required",
        });
    }

    if (!process.env.GROQ_API_KEY) {
        return res.status(503).json({
            status: false,
            message: "AI explanation is unavailable.",
        });
    }

    const insight = await explainScreeningResult({ screening, mlResult });
    res.json({ status: true, insight });
});
