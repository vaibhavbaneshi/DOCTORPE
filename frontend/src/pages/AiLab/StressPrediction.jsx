import { InputBox } from "../../components/Form/InputBox.jsx";
import { useEffect, useState } from "react";
import Popup from "../../components/Form/Popup.jsx";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";
import { MedicalDisclaimer } from "../../components/Disclaimer/MedicalDisclaimer.jsx";
import { GuidedScreening } from "../../components/AiLab/GuidedScreening.jsx";
import { HealthProfileBar } from "../../components/AiLab/HealthProfileBar.jsx";
import { runMlScreening, screeningExplain } from "../../lib/ailab.js";

export default function StressPrediction() {
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState({ result: null, success: false });
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const runScreening = async (payload) => {
    setShowAlert(true);
    setAnalyzing(true);
    setInsight("");
    setInsightLoading(true);
    try {
      const mlResult = await runMlScreening("stress_prediction", payload);
      setResult({ result: mlResult, success: true });
      try {
        const summary = await screeningExplain("stress", mlResult);
        setInsight(summary);
      } catch {
        setInsight("");
      }
    } catch (error) {
      console.error("Error submitting screening:", error);
      setResult({ result: "Error while running the model", success: false });
    } finally {
      setAnalyzing(false);
      setInsightLoading(false);
    }
  };

  const handlePopup = () => {
    setResult({ result: null, success: false });
    setInsight("");
  };

  useEffect(() => {
    if (!showAlert) return undefined;
    const timer = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <>
      <div className="min-h-[100dvh] px-4 py-12">
        {showAlert && (
          <SuccessMessage
            message={
              analyzing
                ? "Running the ML model and preparing your summary…"
                : "Screening complete."
            }
          />
        )}
        <div className="flex w-full items-start justify-start">
          <Link
            to="/AI_Lab"
            className="inline-flex min-h-11 items-center gap-3 rounded-full px-3 text-canopy hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
          >
            <BsArrowLeft aria-hidden="true" /> <span>Back</span>
          </Link>
        </div>
        <div className="health-form mx-auto mt-10 w-full max-w-6xl">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink">
            Stress screening
          </h1>
          <div className="my-4">
            <MedicalDisclaimer />
          </div>

          <div className="mb-6">
            <HealthProfileBar />
          </div>

          <GuidedScreening
            screening="stress"
            title="Talk through how you've been feeling"
            onReady={(collected) => runScreening({ text: collected.text })}
          />

          <details className="mt-8 rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5 md:p-8">
            <summary className="cursor-pointer text-sm font-medium text-ink">
              Write it yourself (50+ words)
            </summary>
            <div className="mt-4">
              <InputBox
                onChange={(e) => setText(e.target.value)}
                label="How you've been feeling"
                type="text"
                name="text"
                id="text"
              />
            </div>
            <div className="mt-6 flex sm:justify-end">
              <button
                type="button"
                onClick={() => runScreening({ text })}
                className="min-h-11 w-full rounded-full bg-canopy px-6 py-3 font-medium text-white hover:bg-canopy-hover sm:w-auto"
              >
                Check signal
              </button>
            </div>
          </details>
        </div>
      </div>

      <ChatBotButton />

      {result.result && (
        <Popup
          result={result.result}
          success={result.success}
          insight={insight}
          insightLoading={insightLoading}
          onClick={handlePopup}
        />
      )}
    </>
  );
}
