import { Link } from "react-router-dom";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { MedicalDisclaimer } from "../../components/Disclaimer/MedicalDisclaimer.jsx";
import { HealthProfileBar } from "../../components/AiLab/HealthProfileBar.jsx";

const screenings = [
  {
    title: "Diabetes risk",
    description: "Review common indicators linked to type 2 diabetes.",
    link: "/AI_Lab/Diabetes",
    image: "/images/design/hero-reference.png",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Heart risk",
    description: "Check cardiovascular health signals.",
    link: "/AI_Lab/Heart_Health",
    image: "/images/design/services-bento.png",
  },
  {
    title: "Stress check",
    description: "Reflect on stress patterns and mental wellbeing.",
    link: "/AI_Lab/Stress_Prediction",
    image: "/images/depression.svg",
  },
];

const AiLab = () => {
  return (
    <div className="mx-auto min-h-[100dvh] max-w-6xl px-4 py-16">
      <header>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          Understand health signals
        </h1>
        <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-mute">
          Guided conversations collect what you know in plain language, then the same ML models score your signal. Groq explains results — not a diagnosis.
        </p>
      </header>
      <div className="mt-8 space-y-4">
        <MedicalDisclaimer />
        <HealthProfileBar />
      </div>
      <section aria-label="Available screenings" className="mt-10 grid gap-4 md:grid-cols-3">
        {screenings.map((screening) => (
          <Link
            key={screening.link}
            to={screening.link}
            className={`group flex min-h-64 flex-col overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-ink/5 transition-transform duration-200 ease-spring hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${screening.className || ""}`}
          >
            <img
              src={screening.image}
              alt=""
              width="900"
              height="700"
              loading="lazy"
              className="min-h-0 flex-1 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-ink">{screening.title}</h2>
              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-mute">
                {screening.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-canopy">
                Start screening
              </span>
            </div>
          </Link>
        ))}
      </section>
      <div className="mt-8 rounded-[1.6rem] bg-canopy/5 p-6 text-sm text-mute">
        Your answers stay in this browser until you submit a screening. Do not enter identifying medical information.
      </div>
      <ChatBotButton />
    </div>
  );
};

export default AiLab;