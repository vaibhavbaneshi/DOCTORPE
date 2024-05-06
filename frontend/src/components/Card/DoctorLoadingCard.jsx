import React from 'react';
 const DoctorLoadingCard = () => {

    return (
        <div className="animate-pulse flex items-center mt-20 mb-20 justify-center ">
            <div className="w-60 h-80 bg-white rounded-3xl  text-neutral-300 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-2xl ">
                <div className="w-32 h-32  "><img src="images/docvid.png" alt="doctor image" /></div>
                <div className="text-black text-center">
                    <p className="h-3 bg-gray-300 w-40 mb-4 rounded-xl"></p>
                    <p className="h-3 bg-gray-300 w-40 mb-4 rounded-xl"></p>
                    <p className="h-3 bg-gray-300 w-40 mb-4 rounded-xl"></p>
                </div>
            </div>
        </div>
    );
};

export default DoctorLoadingCard;