import React from 'react';

export const DoctorCard = ({ onClick, name, description, speciality, label }) => {

    return (
        <div className="flex items-center mt-20 mb-20 justify-center transition duration-700 ease-in-out transform hover:scale-105">
            <div className="w-60 h-80 bg-white rounded-3xl  text-neutral-300 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-2xl hover:shadow-sky-300 transition-shadow">
                <div className="w-32 h-32  "><img src="images/docvid.png" alt="doctor image" /></div>
                <div className="text-black text-center">
                    <p className="font-bold">{name}</p>
                    <p className="font">{speciality}</p>
                    <p className="">{description}</p>
                </div>
                <button onClick={onClick} className="transition duration-700 ease-in-out transform hover:scale-110 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500  rounded-3xl p-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:underline text-white">{label}</button>
            </div>
        </div>
    );
};

export default DoctorCard;
