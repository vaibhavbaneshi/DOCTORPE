import { InputBox } from "../../components/Form/InputBox.jsx";
import { useEffect, useState } from 'react';
import axios from "axios"
import Popup from "../../components/Form/Popup.jsx";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";
import { HealthProfileBar } from "../../components/AiLab/HealthProfileBar.jsx";
import { buildScreeningProfile } from "../../lib/healthProfile.js";
import { useSelector } from "react-redux";

export default function HeartHealth() {
  const { currentUser } = useSelector((state) => state.user);
  const profile = buildScreeningProfile(currentUser);

  const [result, setResult] = useState({result:null, success:false});
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [cp, setCp] = useState('');
  const [trestbps, setTrestbps] = useState('');
  const [chol, setChol] = useState('');
  const [fbs, setFbs] = useState('');
  const [restecg, setRestecg] = useState('');
  const [thalach, setThalach] = useState('');
  const [exang, setExang] = useState('');
  const [oldpeak, setOldpeak] = useState('');
  const [slope, setSlope] = useState('');
  const [ca, setCa] = useState('');
  const [thal, setThal] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async() => {
    setShowAlert(true)
     const data = {
      age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
     }
    console.log(`cp type ${cp}`)

    await axios.post('https://model-api-dbuz.onrender.com/heart_health_prediction', data)
      .then(response => {
        setResult({result:response.data[0], success:true});
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setResult({result:"Error : while submitting form"})
      });
  };

  const handlePopup=()=>{
    setResult({result:null, success:false})
  }

  useEffect(() => {
    if (!showAlert) return undefined;
    const timer = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  useEffect(() => {
    if (!profile) return;
    if (profile.mlSex && !sex) setSex(profile.mlSex);
    if (profile.age != null && !age) setAge(String(profile.age));
  }, [profile?.age, profile?.mlSex]);

  return (
    <>
      <div className="flex min-h-[100dvh] w-full flex-col px-4 py-12 sm:px-6">
      {showAlert && <SuccessMessage message={`Our Machine Learning Model is analysing your result`} />}
      <div className="flex items-start justify-start w-full">
        <Link to="/AI_Lab" className="inline-flex min-h-11 items-center gap-3 rounded-full px-3 text-canopy hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"><BsArrowLeft aria-hidden="true" /> <span>Back</span></Link>
      </div>
        <div className="health-form mx-auto w-full max-w-6xl">
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink">Heart health screening</h1>
            <div className="my-4">
              <HealthProfileBar />
            </div>

            <div className="mb-6 rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5 md:p-8">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Details</p><br />
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm sm:grid-cols-2">
                    <div className="md:col-span-1">
                      <InputBox
                        label="Age"
                        type="text"
                        onChange={(e) => setAge(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <div className="md:col-span-5 mb-4">
                        <label htmlFor="sex">Sex</label>
                        <select
                          onChange={(e) => setSex(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="sex"
                          name="sex"
                        >
                          <option value="">Select sex…</option>
                          <option value="0">Female</option>
                          <option value="1">Male</option>
                        </select>
                        </div>
                      </div>
                    <div className="md:col-span-1">
                      <div className="md:col-span-5 mb-4">
                        <label htmlFor="chest_pain">Chest Pain Type</label>
                        <select
                          onChange={(e) => setCp(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="chest_pain"
                          name="chest_pain"
                        >
                          <option value="">Select chest pain type…</option>
                          <option value="0">Typical Angina</option>
                          <option value="1">Atypical Angina</option>
                          <option value="2">Non-anginal Pain</option>
                          <option value="3">Asymptomatic</option>
                        </select>
                        </div>
                      </div>
                    <div className="md:col-span-1">
                      <InputBox
                        label="Resting Blood Pressure"
                        type="text"
                        onChange={(e) => setTrestbps(e.target.value) }
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        label="Serum Cholesterol"
                        type="text"
                        onChange={(e) => setChol(e.target.value) }
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="fbs">Fasting Blood Sugar (fasting blood sugar {'>'} 120 mg/dl)</label>
                        <select
                          onChange={(e) => setFbs(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="fbs"
                          name="fbs"
                        >
                          <option value="">Select an option…</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="restecg">Resting Electrocardiographic Results</label>
                        <select
                          onChange={(e) => setRestecg(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="restecg"
                          name="restecg"
                        >
                          <option value="">Select a result…</option>
                          <option value="0">Normal</option>
                          <option value="1">Having ST-T wave abnormality</option>
                          <option value="2">showing probable or definite left ventricular hypertrophy</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        label="Maximum Heart Rate Achieved"
                        type="text"
                        onChange={(e) => setThalach(e.target.value) }
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="exercise-angina">Exercise Induced Angina</label>
                        <select
                          onChange={(e) => setExang(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="exercise-angina"
                          name="exercise-angina"
                        >
                          <option value="">Select an option…</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        label="ST Depression Induced by Exercise Relative to Rest"
                        type="text"
                        onChange={(e) => setOldpeak(e.target.value) }
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="st-slope">Slope of the Peak Exercise ST Segment</label>
                        <select
                          onChange={(e) => setSlope(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="st-slope"
                          name="st-slope"
                        >
                          <option value="">Select a slope…</option>
                          <option value="0">Up sloping</option>
                          <option value="1">Flat</option>
                          <option value="2">Down sloping</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="major-vessels">Number of Major Vessels Colored by Fluoroscopy</label>
                        <select
                          onChange={(e) => setCa( e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="major-vessels"
                          name="major-vessels"
                        >
                          <option value="">Select vessel count…</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="thalassemia">Thalassemia</label>
                        <select
                          onChange={(e) => setThal( e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="thalassemia"
                          name="thalassemia"
                        >
                          <option value="">Select thalassemia result…</option>
                          <option value="1">Fixed defect</option>
                          <option value="2">Normal</option>
                          <option value="3">Reversable defect</option>
                        </select>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex sm:justify-end">
                <div className="w-full sm:w-auto">
                  <button type="button" className="min-h-11 w-full rounded-full bg-canopy px-6 py-3 font-medium text-white hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98] sm:w-auto" onClick={handleSubmit}>Check signal</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ChatBotButton />
      </div>

      {result.result && (
        <Popup result={result.result} success={result.success} onClick={handlePopup} />
      )}

    </>
  );
}