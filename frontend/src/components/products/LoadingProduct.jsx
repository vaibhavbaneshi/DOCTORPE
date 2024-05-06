import React from 'react';

const LoadingProduct = () => {
    return (
        <div className="animate-pulse flex flex-col justify-center w-90 h-3/4 items-center space-y-2 bg-white border border-gray-200  p-4 box-border rounded-3xl ">
            <img className="w-60 h-60" src="https://thumb.ac-illust.com/11/119ffc2ddef90858503e7988ddd55bf1_t.jpeg" alt="image" />
            <h1 className="bg-gray-300 w-60 h-2"></h1>
            <h2 className="bg-gray-300 w-60 h-2"></h2>
            <div className="flex bg-gray-300 w-60 h-2 items-center space-x-2">
            </div>
            <div className="flex flex-col ">
                <button
                  className={`mt-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500  py-5 px-28 mb-4 }`}
                >
                </button>
            </div>
        </div>
    );
};

export default LoadingProduct;