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
import { applyDiabetesPayload, buildScreeningProfile } from "../../lib/healthProfile.js";
import { useSelector } from "react-redux";

export default function Diabetes() {
  const { currentUser } = useSelector((state) => state.user);
  const profile = buildScreeningProfile(currentUser);
  const [Pregnancies, setPregnancies] = useState("");
  const [Glucose, setGlucose] = useState("");
  const [BloodPressure, setBloodPressure] = useState("");
  const [SkinThickness, setSkinThickness] = useState("");
  const [Insulin, setInsulin] = useState("");
  const [BMI, setBMI] = useState("");
  const [DiabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState("");
  const [Age, setAge] = useState("");
  const [result, setResult] = useState({ result: null, success: false });
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const runScreening = async (data) => {
    const payload = applyDiabetesPayload(data, profile);
    setShowAlert(true);
    setAnalyzing(true);
    setInsight("");
    setInsightLoading(true);
    try {
      const mlResult = await runMlScreening("diabetes_prediction", payload);
      setResult({ result: mlResult, success: true });
      try {
        const text = await screeningExplain("diabetes", mlResult);
        setInsight(text);
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

  const handleManualSubmit = () => {
    runScreening({
      Pregnancies: profile?.skipPregnancy ? 0 : Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    });
  };

  useEffect(() => {
    if (!profile) return;
    if (profile.age != null && !Age) setAge(String(profile.age));
    if (profile.skipPregnancy) setPregnancies("0");
  }, [profile?.age, profile?.skipPregnancy]);

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
            Diabetes risk screening
          </h1>
          <div className="my-4">
            <MedicalDisclaimer />
          </div>

          <div className="mb-6">
            <HealthProfileBar />
          </div>

          <GuidedScreening
            screening="diabetes"
            title="Guided intake (recommended)"
            onReady={(collected) => runScreening(collected)}
          />

          <details className="mt-8 rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5 md:p-8">
            <summary className="cursor-pointer text-sm font-medium text-ink">
              Manual entry (clinical fields)
            </summary>
            <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              {!profile?.skipPregnancy && (
                <InputBox onChange={(e) => setPregnancies(e.target.value)} label="Pregnancies" type="number" name="Pregnancies" id="Pregnancies" value={Pregnancies} />
              )}
              <InputBox onChange={(e) => setGlucose(e.target.value)} label="Glucose" type="number" name="Glucose" id="Glucose" />
              <InputBox onChange={(e) => setBloodPressure(e.target.value)} label="Blood Pressure" type="number" name="blood_pressure" id="blood_pressure" />
              <InputBox onChange={(e) => setSkinThickness(e.target.value)} label="Skin Thickness" type="number" name="skin_thickness" id="skin_thickness" />
              <InputBox onChange={(e) => setInsulin(e.target.value)} label="Insulin" type="number" name="insulin" id="insulin" />
              <InputBox onChange={(e) => setBMI(e.target.value)} label="BMI" type="number" name="bmi" id="bmi" />
              <InputBox onChange={(e) => setDiabetesPedigreeFunction(e.target.value)} label="Diabetes Pedigree Function" type="number" name="diabetes_pedigree_function" id="diabetes_pedigree_function" />
              <InputBox onChange={(e) => setAge(e.target.value)} label="Age" type="number" name="age" id="age" value={Age} />
            </div>
            <div className="mt-6 flex sm:justify-end">
              <button type="button" onClick={handleManualSubmit} className="min-h-11 w-full rounded-full bg-canopy px-6 py-3 font-medium text-white hover:bg-canopy-hover sm:w-auto">
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
