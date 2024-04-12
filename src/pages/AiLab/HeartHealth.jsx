import { InputBox } from "../../components/Form/InputBox.jsx";
import { useState } from 'react';
import axios from "axios"
import Popup from "../../components/Form/Popup.jsx";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";

export default function HeartHealth() {

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

  setTimeout(() => {
    setShowAlert(false)
  }, 5000)

  return (
    <>
      <div className="min-h-screen p-3 bg-gradient-to-br from-slate-100 to-cyan-100 flex flex-col items-center justify-center">
      {showAlert && <SuccessMessage message={`Our Machine Learning Model is analysing your result`} />}
      <div className="flex items-start justify-start w-full">
        <Link to="/AI_Lab" className="pt-10 text-black-500 bg-gray-100 text-lg hover:underline flex items-center space-x-3"><BsArrowLeft /> <span>Back</span></Link>
      </div>
        <div className="container max-w-screen-lg  mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Diabetes Prediction Form</h2>
            <br />

            <div className="bg-white rounded shadow-lg p-3 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Details</p><br />
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-2">

                    {/* New Input Fields */}
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
                        >
                          <option value=""></option>
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
                        >
                          <option value=""></option>
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
                        >
                          <option value=""></option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="Resting Electrocardiographic Results">Resting Electrocardiographic Results</label>
                        <select
                          onChange={(e) => setRestecg(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="Resting Electrocardiographic Results" 
                        >
                          <option value=""></option>
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
                        <label htmlFor="Exercise Induced Angina">Exercise Induced Angina</label>
                        <select
                          onChange={(e) => setExang(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="Exercise Induced Angina" 
                        >
                          <option value=""></option>
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
                        <label htmlFor="Slope of the Peak Exercise ST Segment">Slope of the Peak Exercise ST Segment</label>
                        <select
                          onChange={(e) => setSlope(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="Slope of the Peak Exercise ST Segment" 
                        >
                          <option value=""></option>
                          <option value="0">Up sloping</option>
                          <option value="1">Flat</option>
                          <option value="2">Down sloping</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="Number of Major Vessels Colored by Fluoroscopy">Number of Major Vessels Colored by Fluoroscopy</label>
                        <select
                          onChange={(e) => setCa( e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="Number of Major Vessels Colored by Fluoroscopy" 
                        >
                          <option value=""></option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                    <div className="md:col-span-5 mb-4">
                        <label htmlFor="thalassemia">thalassemia</label>
                        <select
                          onChange={(e) => setThal( e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          id="thalassemia" 
                        >
                          <option value=""></option>
                          <option value="1">Fixed defect</option>
                          <option value="2">Normal</option>
                          <option value="3">Reversable defect</option>
                        </select>
                        </div>
                    </div>
                    {/* Add other input fields similarly */}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-cyan-500 hover:bg-[#10f9f9] text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
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