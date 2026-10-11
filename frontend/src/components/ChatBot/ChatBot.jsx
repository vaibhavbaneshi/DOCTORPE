import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";

const QUICK_PROMPTS = [
    "What helps with a mild headache?",
    "Suggest options from the pharmacy",
    "How do I book a doctor?",
];

const sendMessageAPI = async ({ message, history }) => {
    const res = await api.post("/chatbot/ask", { message, history });
    return res.data;
};

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [isAITyping, setIsAITyping] = useState(false);
    const [conversation, setConversation] = useState([
        {
            role: "assistant",
            content:
                "Hi — I'm DoctorPe's health assistant. Ask about everyday symptoms, medicines in our catalog, or booking a clinician. I can't prescribe, but I can guide you.",
            actions: [
                { label: "Browse medicines", href: "/medicines" },
                { label: "Find a doctor", href: "/bookDoctor" },
            ],
        },
    ]);
    const scrollRef = useRef(null);

    const mutation = useMutation({
        mutationFn: sendMessageAPI,
        onSuccess: (data) => {
            setIsAITyping(false);
            setConversation((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        data.message?.trim() ||
                        "I couldn't answer that. Try rephrasing or browse Medicines for product details.",
                    actions: data.actions || [],
                },
            ]);
        },
        onError: (error) => {
            setIsAITyping(false);
            const serverMessage = error.response?.data?.message;
            setConversation((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: serverMessage || "Sorry, I couldn't answer that right now.",
                    actions: [{ label: "Browse medicines", href: "/medicines" }],
                },
            ]);
        },
    });

    const send = (text) => {
        const currentMessage = text.trim();
        if (!currentMessage || mutation.isPending) return;

        const history = conversation.map(({ role, content }) => ({ role, content }));

        setConversation((prev) => [...prev, { role: "user", content: currentMessage }]);
        setIsAITyping(true);
        mutation.mutate({ message: currentMessage, history });
        setMessage("");
    };

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [conversation, isAITyping]);

    return (
        <div className="mb-3 flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-[1.6rem] bg-surface shadow-tint ring-1 ring-ink/10 sm:w-96">
            <header className="border-b border-ink/10 bg-canvas px-4 py-3">
                <p className="text-sm font-semibold text-ink">DoctorPe assistant</p>
                <p className="mt-1 text-xs leading-relaxed text-mute">
                    Educational only — not a diagnosis. For emergencies, call local emergency services.
                </p>
            </header>

            <div
                ref={scrollRef}
                className="flex max-h-[50dvh] min-h-[280px] flex-col gap-3 overflow-y-auto bg-canvas/50 px-3 py-4"
            >
                {conversation.map((entry, index) => (
                    <div
                        key={`${entry.role}-${index}`}
                        className={`flex flex-col gap-2 ${entry.role === "user" ? "items-end" : "items-start"}`}
                    >
                        {entry.role === "assistant" && (
                            <div className="flex items-center gap-2 text-xs font-medium text-canopy">
                                <img className="h-6 w-6 rounded-full bg-canopy/10 p-0.5" src="/images/result.svg" alt="" />
                                DoctorPe
                            </div>
                        )}
                        <div
                            className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                entry.role === "user"
                                    ? "bg-canopy text-white"
                                    : "bg-surface text-ink ring-1 ring-ink/10"
                            }`}
                        >
                            {entry.content}
                        </div>
                        {entry.actions?.length > 0 && entry.role === "assistant" && (
                            <div className="flex flex-wrap gap-2">
                                {entry.actions.map((action) => (
                                    <Link
                                        key={action.href + action.label}
                                        to={action.href}
                                        className="rounded-full border border-ink/15 bg-surface px-3 py-1 text-xs font-medium text-canopy hover:bg-ink/5"
                                    >
                                        {action.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {isAITyping && (
                    <p className="text-sm text-mute" aria-live="polite">
                        DoctorPe is typing…
                    </p>
                )}
            </div>

            <div className="border-t border-ink/10 bg-surface p-3">
                <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                    {QUICK_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            type="button"
                            onClick={() => send(prompt)}
                            className="shrink-0 rounded-full border border-ink/10 px-3 py-1 text-xs text-ink hover:bg-canvas"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
                <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        send(message);
                    }}
                >
                    <label htmlFor="chatbot-input" className="sr-only">
                        Message
                    </label>
                    <input
                        id="chatbot-input"
                        type="text"
                        placeholder="Ask about symptoms or medicines…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-11 flex-1 rounded-full border border-ink/10 bg-canvas px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    />
                    <button
                        type="submit"
                        disabled={mutation.isPending || !message.trim()}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canopy text-white hover:bg-canopy-hover disabled:opacity-50"
                        aria-label="Send message"
                    >
                        <IoSend aria-hidden="true" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
