

export default function Popup({onClick,result,success}){


return (
    <div className="fixed top-0 left-0 w-full p-10 h-full bg-black bg-opacity-50 flex items-center  justify-center  ">
    <div className=" flex justify-center  ">
    <div className= "bg-white p-5  rounded-3xl shadow-lg flex flex-col items-center">
        <div className="w-32 h-32 mb-4 "><img src="/images/result.svg" alt="doctor image" /></div>
        <p className="font-semibold text-l">Result</p>
        <p className={success?"font-semibold text-xl p-4 mb-1 text-[#1ad1ff]":"font-bold p-4 mb-1 text-xl text-[#FF033E]"}>{result}</p>
        <button onClick={onClick} className="bg-cyan-500 w-60  mb-5 hover:bg-[#10f9f9] text-white font-bold py-2 px-4 rounded-xl mt-4">Close</button>
    </div>
    </div>
    </div>
)
}