import { InputBox } from "../../components/Form/InputBox.jsx";
import { useState } from 'react';
import axios from "axios"
import Popup from "../../components/Form/Popup.jsx";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";

export default function Diabetes() {

  const [Pregnancies,setPregnancies]= useState("")
  const [Glucose, setGlucose] = useState("");
  const [BloodPressure, setBloodPressure] = useState("");
  const [SkinThickness, setSkinThickness] = useState("");
  const [Insulin, setInsulin] = useState("");
  const [BMI, setBMI] = useState("");
  const [DiabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState("");
  const [Age, setAge] = useState("");
  const [result, setResult] = useState({result:null,success:false});
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async() => {
    const data = {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age
    };
    setShowAlert(true)
    await axios.post('https://model-api-dbuz.onrender.com/diabetes_prediction', data)
      .then(response => {
        setResult({result:response.data[0],success:true});

      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setResult({result:"Error : while submitting form"})
      });
  };

  const handlePopup=()=>{
    setResult({result:null,success:false})
  }

  setTimeout(() => {
    setShowAlert(false)
  }, 5000)

  return (
    <>
      <div className="h-screen p-3 bg-gradient-to-br from-slate-100 to-cyan-100 ">
      {showAlert && <SuccessMessage message={`Our Machine Learning Model is analysing your result`} />}
        <div className="flex items-start justify-start w-full">
        <Link to="/AI_Lab" className="pt-10 text-black-500 bg-gray-100 text-lg hover:underline flex items-center space-x-3"><BsArrowLeft /> <span>Back</span></Link>
      </div>
        <div className="container max-w-screen-lg mt-10 mx-auto  ">
          <div  >
            <h2 className="font-semibold text-xl text-gray-600">Diabetes Prediction Form</h2>
            <br />

            <div className="bg-white rounded shadow-lg p-3 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Details</p><br />
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-2">

                  <div className="md:col-span-1">
                      <InputBox
                        onChange={(e) => setPregnancies(e.target.value)}
                        label="Pregnancies"
                        type="text"
                        name="Pregnancies"
                        id="Pregnancies"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e) => setGlucose(e.target.value)}
                        label="Glucose"
                        type="text"
                        name="Glucose"
                        id="Glucose"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e )=> setBloodPressure(e.target.value)}
                        label="Blood Pressure"
                        type="text"
                        name="blood_pressure"
                        id="blood_pressure"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e )=> setSkinThickness(e.target.value)}
                        label="Skin Thickness"
                        type="text"
                        name="skin_thickness"
                        id="skin_thickness"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e )=> setInsulin(e.target.value)}
                        label="Insulin"
                        type="text"
                        name="insulin"
                        id="insulin"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e )=> setBMI(e.target.value)}
                        label="BMI"
                        type="text"
                        name="bmi"
                        id="bmi"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e) => setDiabetesPedigreeFunction(e.target.value)}
                        label="Diabetes Pedigree Function"
                        type="text"
                        name="diabetes_pedigree_function"
                        id="diabetes_pedigree_function"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <InputBox
                        onChange={(e )=> setAge(e.target.value)}
                        label="Age"
                        type="text"
                        name="age"
                        id="age"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 text-right">
                <div className="inline-flex items-end">
                  <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-[#10f9f9] text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
          <ChatBotButton />
      </div>

      {result.result  && (
        <Popup result={result.result} success={result.success}onClick={handlePopup}/>

      )}

    </>
  );
}