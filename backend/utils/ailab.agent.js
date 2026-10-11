import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const getModel = () => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not configured");
    }
    return new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.2,
        maxTokens: 800,
    });
};

const INTAKE_SPECS = {
    diabetes: {
        apiFields: [
            "Pregnancies",
            "Glucose",
            "BloodPressure",
            "SkinThickness",
            "Insulin",
            "BMI",
            "DiabetesPedigreeFunction",
            "Age",
        ],
        intro: `Diabetes screening needs numbers for a research-style model. Your job is to collect them through everyday conversation.

PLAIN LANGUAGE (mandatory in "reply"):
- Never use jargon in questions: no mg/dL, mmHg, "fasting glucose", systolic, triceps, pedigree, insulin units, or field names like BMI in the question text.
- Say: blood sugar, blood pressure, height and weight, family history of diabetes.
- One main topic per message. At most one short follow-up in the same message.
- Offer examples: "like 120 over 80", "around 100", "I'm not sure".
- If they say start / ok / yes / hi, ask the NEXT missing topic — do not repeat the intro.

Suggested flow (skip steps already in alreadyCollected):
1) Blood sugar from a recent test or home meter — number or rough band (normal / a bit high / very high / don't know).
2) Blood pressure — "120 over 80" or normal / high / don't know.
3) Height and weight (any units they use) — compute BMI internally, or accept a BMI number if they know it.
4) Family — "Does diabetes run in your family (parent or sibling)?"
5) Pregnancies only for females if not already set.

Internal mapping (numbers in "collected" only — never lecture the user about these):
- Glucose: parse a number; bands ~90 / ~130 / ~180; if still unknown after one ask, use 0 only if they clearly don't know.
- BloodPressure: systolic from "a over b" or bands ~120 / ~140; unknown → 0 after one ask.
- BMI: from height+weight or direct; unknown → 0 after one ask.
- DiabetesPedigreeFunction: ~0.35 if yes family history, ~0.1 if no, ~0.25 if unsure.
- SkinThickness, Insulin: almost nobody knows — one optional friendly ask ("any recent lab slip with insulin or skinfold?"); then 0 if not.
- Age, Pregnancies: from profile when provided.

Tone: warm, short, like a nurse chat — not a lab form.`,
    },
    stress: {
        apiFields: ["text"],
        intro:
            "Stress screening needs a short journal (50+ words). Ask how sleep, mood, and daily stress feel in everyday words — no clinical scales.",
    },
};

const parseJsonBlock = (text) => {
    const trimmed = text.trim();
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
        return JSON.parse(trimmed.slice(start, end + 1));
    } catch {
        return null;
    }
};

const KICKOFF_MESSAGE = /^(start|ok(?:ay)?|yes|go|hi|hello|sure|ready)$/i;

const diabetesFriendlyPrompt = (collected, profileContext) => {
    const name = profileContext?.firstName;
    const hi = name ? `${name}, ` : "";

    if (collected.Glucose === undefined) {
        return `${hi}let's go one question at a time. Do you remember your blood sugar from a recent blood test or home meter? A number is great — or say "normal", "a bit high", or "I'm not sure".`;
    }
    if (collected.BloodPressure === undefined) {
        return `Thanks. Do you know your usual blood pressure? You can type it like "120 over 80", or say normal, high, or not sure.`;
    }
    if (collected.BMI === undefined) {
        return `What is your height and weight? Any units are fine (for example 5 ft 10 and 75 kg). If you already know a BMI number, you can share that instead.`;
    }
    if (
        profileContext?.sex === "female" &&
        collected.Pregnancies === undefined
    ) {
        return `How many times have you been pregnant before? Enter a number, or 0 if none.`;
    }
    if (collected.DiabetesPedigreeFunction === undefined) {
        return `Does diabetes run in your family — a parent or sibling? Yes, no, or not sure is fine.`;
    }
    if (collected.SkinThickness === undefined || collected.Insulin === undefined) {
        return `Last one — do you have insulin or skinfold numbers from a lab printout? Most people don't; just reply "no" if that's you.`;
    }
    return null;
};

const applyProfileSeeds = (screening, collected, profileContext) => {
    const next = { ...collected };
    if (!profileContext) return next;

    if (screening === "diabetes") {
        if (profileContext.age != null && next.Age === undefined) {
            next.Age = profileContext.age;
        }
        if (profileContext.skipPregnancy) {
            next.Pregnancies = 0;
        }
    }

    return next;
};

export const runScreeningIntake = async ({
    screening,
    collected = {},
    userMessage,
    profileContext,
}) => {
    const spec = INTAKE_SPECS[screening];
    if (!spec) {
        throw new Error("Unknown screening type");
    }

    collected = applyProfileSeeds(screening, collected, profileContext);

    const trimmedMessage = userMessage?.trim() || "";

    if (screening === "diabetes" && KICKOFF_MESSAGE.test(trimmedMessage)) {
        const reply = diabetesFriendlyPrompt(collected, profileContext);
        if (reply) {
            return { reply, collected, done: false };
        }
    }

    const llm = getModel();
    let system = `You are DoctorPe's screening intake assistant (not a doctor).
${spec.intro}
Required API fields (numbers unless noted): ${spec.apiFields.join(", ")}.
Rules:
- Never diagnose or give medical advice during intake.
- Merge user answers into "collected". Use numeric types for number fields.
- For stress, "text" must be >= 50 words when done is true.
- "I don't know" / "not sure" / "skip" counts as an answer — do not nag; use 0 for unknown model fields after one gentle ask.
- Reply warmly in under 90 words in "reply". Questions must be answerable without medical training.
Output ONLY valid JSON:
{"reply":"...","collected":{...},"done":true|false}`;

    if (profileContext?.firstName) {
        system += `\nAddress the user as ${profileContext.firstName} when natural.`;
    }
    if (profileContext?.age != null) {
        system += `\nUser age is already known (${profileContext.age}): do not ask for age again unless they correct it.`;
    }
    if (profileContext?.sex === "male" && screening === "diabetes") {
        system +=
            "\nUser is male: set Pregnancies to 0 and never ask about pregnancy or prior pregnancies.";
    }
    if (profileContext?.sex === "female" && screening === "diabetes") {
        system +=
            "\nUser is female: you may ask about number of prior pregnancies if not already in collected.";
    }

    const payload = JSON.stringify({
        alreadyCollected: collected,
        userMessage: trimmedMessage,
        profileContext: profileContext || null,
    });

    const result = await llm.invoke([
        new SystemMessage(system),
        new HumanMessage(payload),
    ]);

    const text =
        typeof result.content === "string"
            ? result.content
            : String(result.content ?? "");

    const parsed = parseJsonBlock(text);
    if (!parsed?.reply) {
        const fallback =
            screening === "diabetes"
                ? diabetesFriendlyPrompt(collected, profileContext) ||
                  "Thanks — say a bit more in your own words, or type \"not sure\"."
                : "Tell me a bit more about how you've been feeling lately.";
        return {
            reply: fallback,
            collected,
            done: false,
        };
    }

    return {
        reply: parsed.reply,
        collected: { ...collected, ...(parsed.collected || {}) },
        done: Boolean(parsed.done),
    };
};

export const explainScreeningResult = async ({ screening, mlResult }) => {
    const llm = getModel();
    const system =
        "You are DoctorPe's educational health assistant. Explain a screening model output in plain language in under 120 words. " +
        "Do not diagnose. Say what the label might mean, limitations of ML screens, and suggest speaking with a clinician. " +
        "Do not use markdown bullets; use short paragraphs.";

    const result = await llm.invoke([
        new SystemMessage(system),
        new HumanMessage(
            JSON.stringify({
                screening,
                modelOutput: mlResult,
            })
        ),
    ]);

    const text =
        typeof result.content === "string"
            ? result.content
            : String(result.content ?? "");
    return text.replace(/\*\*/g, "").replace(/\*/g, "");
};
