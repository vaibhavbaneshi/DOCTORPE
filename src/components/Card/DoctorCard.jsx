import React, { useState } from 'react';

export const DoctorCard = ({ onClick, name, email, description, speciality }) => {

    return (
        <div className="flex items-center mt-20 mb-20 justify-center transition duration-700 ease-in-out transform hover:scale-105">
            <div className="w-60 h-80 bg-white rounded-3xl  text-neutral-300 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-2xl hover:shadow-sky-300 transition-shadow">
                <div className="w-32 h-32  "><img src="images/docvid.png" alt="doctor image" /></div>
                <div className="text-black text-center">
                    <p className="font-bold">{name}</p>
                    <p className="font">{speciality}</p>
                    <p className="">{description}</p>
                    {/* <p className="">{email}</p> */}
                </div>
                <button onClick={onClick} className="bg-cyan-500 hover:bg-[#10f9f9] text-white font-bold py-2 px-4 rounded-xl">Consult Now</button>
            </div>
        </div>
    );
};

export default DoctorCard;
