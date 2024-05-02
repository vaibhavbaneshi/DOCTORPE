import { InputBox } from "../../components/Form/InputBox.jsx";
import { useState } from 'react';
import axios from "axios"
import Popup from "../../components/Form/Popup.jsx";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";

export default function StressPrediction() {

  const [text, setText]= useState("")
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState({result:null, success:false});

  const handleSubmit = async() => {

    setShowAlert(true)
    
    await axios.post('https://model-api-dbuz.onrender.com/stress_prediction', {text})
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
        <Link to="/AI_Lab" className="pt-10 text-black-500 bg-gray-100 text-lg hover:underline flex items-center justify-center space-x-3"><BsArrowLeft /> <span>Back</span></Link>
      </div>
        <div className="container max-w-screen-lg mt-10 mx-auto  ">
          <div  >
            <h2 className="font-semibold text-xl text-gray-600">Stress Prediction Form</h2>
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
                        onChange={(e) => setText(e.target.value)}
                        label="Enter how you feel in more than 50 words"
                        type="text"
                        name="text"
                        id="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 text-right">
                <div className="inline-flex items-end">
                  <button onClick={handleSubmit} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-cyan-400 text-white font-bold py-2 px-4 rounded">Submit</button>
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