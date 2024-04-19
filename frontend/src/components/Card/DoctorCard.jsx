import React from 'react';
// import './DoctorCard.css'
export const DoctorCard = ({ onClick, name, description, speciality, label }) => {

    return (
        <div className="px-6 py-2 flex items-center mt-20 mb-20 justify-center transition duration-700 ease-in-out transform hover:scale-105">
            <div className="w-60 h-80 bg-white rounded-3xl  text-neutral-300 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-400 transition-shadow">
                <div className="w-32 h-32  "><img src="images/docvid.png" alt="doctor image" /></div>
                <div className="text-black text-center">
                    <p className="font-bold">{name}</p>
                    <p className="font">{speciality}</p>
                    <p className="">{description}</p>
                </div>
                <button onClick={onClick} className=" hover:cursor-pointer rounded-2xl p-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-cyan-400 text-white docCardbtn">{label}</button>
            </div>
        </div>
    );
};

export default DoctorCard;