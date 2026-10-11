import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE, screeningIntake } from "../../lib/ailab.js";
import {
    buildScreeningProfile,
    profileContextForApi,
    seedCollectedFromProfile,
} from "../../lib/healthProfile.js";

const STARTERS = {
    diabetes:
        "Hi — I'll walk you through a few everyday questions (blood sugar, blood pressure, height and weight, family history). Numbers from a recent checkup are great, but \"I'm not sure\" is always OK.",
    stress:
        "Hi — tell me how you've been feeling lately — sleep, mood, stress — in your own words. This is educational only, not a diagnosis.",
};

export const GuidedScreening = ({ screening, onReady, title }) => {
    const { currentUser } = useSelector((state) => state.user);
    const profile = useMemo(
        () => buildScreeningProfile(currentUser),
        [currentUser]
    );

    const starter = useMemo(() => {
        let text = STARTERS[screening];
        if (profile?.firstName) {
            text = text.replace(/^Hi —/, `Hi ${profile.firstName} —`);
        }
        if (screening === "diabetes" && profile?.skipPregnancy) {
            text += " I won't ask about pregnancy. Reply start when you're ready.";
        } else if (screening === "diabetes" && profile?.age != null) {
            text += " Reply start when you're ready.";
        } else if (screening === "diabetes") {
            text += " Reply start when you're ready.";
        }
        return text;
    }, [screening, profile]);

    const [messages, setMessages] = useState(() => [
        { role: "assistant", content: starter },
    ]);
    const [input, setInput] = useState("");
    const [collected, setCollected] = useState(() =>
        seedCollectedFromProfile(screening, profile)
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const profileContext = useMemo(
        () => profileContextForApi(profile),
        [profile]
    );

    useEffect(() => {
        if (!profile) return;
        setCollected((prev) => ({
            ...seedCollectedFromProfile(screening, profile),
            ...prev,
        }));
    }, [profile, screening]);

    const send = async (text) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        setError("");
        setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
        setInput("");
        setLoading(true);

        try {
            const data = await screeningIntake(
                screening,
                trimmed,
                collected,
                profileContext
            );
            setCollected(data.collected || {});
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
            if (data.done) {
                onReady(data.collected);
            }
        } catch (err) {
            const serverMessage = err.response?.data?.message;
            if (!err.response) {
                setError(
                    `Cannot reach the API at ${API_BASE}. Start the backend (port 3000) and use http://localhost:5173 (not 127.0.0.1) if CORS blocks.`
                );
            } else {
                setError(
                    serverMessage ||
                        "Could not reach the intake assistant. Try again or use manual entry."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5 md:p-6">
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-mute">
                Conversational intake — still runs the same ML model at the end.
            </p>

            <div
                className="mt-4 max-h-80 space-y-3 overflow-y-auto rounded-xl border border-ink/10 bg-canvas p-4"
                aria-live="polite"
            >
                {messages.map((entry, index) => (
                    <p
                        key={`${entry.role}-${index}`}
                        className={
                            entry.role === "user"
                                ? "ml-8 text-sm text-ink"
                                : "mr-8 text-sm text-mute"
                        }
                    >
                        <span className="font-medium text-ink">
                            {entry.role === "user" ? "You: " : "Guide: "}
                        </span>
                        {entry.content}
                    </p>
                ))}
                {loading && (
                    <p className="text-sm text-mute" aria-busy="true">
                        Guide is thinking…
                    </p>
                )}
            </div>

            {error && (
                <p className="mt-3 text-sm text-red-700" role="alert">
                    {error}
                </p>
            )}

            <form
                className="mt-4 flex flex-col gap-2 sm:flex-row"
                onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                }}
            >
                <label htmlFor={`${screening}-intake`} className="sr-only">
                    Your reply
                </label>
                <input
                    id={`${screening}-intake`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your answer…"
                    className="min-h-11 flex-1 rounded-full border border-ink/10 bg-canvas px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="min-h-11 rounded-full bg-canopy px-5 text-sm font-medium text-white hover:bg-canopy-hover disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    );
};
