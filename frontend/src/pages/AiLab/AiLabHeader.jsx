import { useNavigate} from "react-router-dom"
import { useState } from "react"

export default function AiLabHeader(){

    const [selectedModel,setSelectedModel] =useState("Diabetes Prediction")
    const navigate = useNavigate();
    const handleModelChange=(model)=>{
        if(model === "Diabetes Prediction"){
            setSelectedModel("Diabetes Prediction")
            navigate("/AI_Lab/Diabetes");
        }
        else if(model === "Heart Health Prediction"){
            setSelectedModel("Heart Health Prediction")
            navigate("/AI_Lab/Heart_Health");
        }
        // else if(model === "Mental Health Prediction"){
        //     navigate("/diabetes");
        // }
    }

    return (
              <div className="flex justify-around w-100  item-center">
                    <div className="bg-white rounded-2xl transition duration-200 ease-in hover:scale-105 border hover:shadow-lg">
                        {["Diabetes Prediction", "Heart Health Prediction"].map(model => (
                            <button key={model} 
                                    className={`py-4 px-8 text-xs hover:underline hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white hover:rounded-2xl hover:mx-1 ${selectedModel === model ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl' : ''}`} 
                                    onClick={() => handleModelChange(model)}
                                    >
                                {model}
                            </button>
                        ))}
                    </div>
              </div>
    )
}