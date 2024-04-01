import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Form/Button';

const Product = ({ id, title, image, description, price, reviews, rating, handleProductSelection }) => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const handleAddToCart = () => {
        handleProductSelection({ id, title, image, description, price, reviews, rating });
        setDisabled(true);
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-2 bg-white border border-gray-200 hover:shadow-2xl hover:shadow-sky-300 transition duration-700 ease-in-out transform hover:scale-105 p-4 box-border rounded-3xl ">
            <img className="" src={image} alt={title} />
            <h1 className="text-gray-600 poppins text-lg text-center">{title}</h1>
            {/* price  */}
            <h2 className="text-gray-900 text-center font-bold poppins text-3xl">₹ {price}</h2>
            {/* rating  */}
            <div className="flex items-center space-x-2">
                <Rating
                    emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
                    fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                    initialRating={rating}
                    readonly
                />
                <span className="text-gray-600">({reviews})</span>
            </div>
            {/* buttons */}
            <div className="flex">
                <button
                  disabled={disabled}
                  className={`mr-20 transition duration-700 ease-in-out transform hover:scale-110 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500  rounded-3xl p-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:underline text-white ${disabled ? 'opacity-30' : ''}`}
                  onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
                <button className="transition duration-700 ease-in-out transform hover:scale-110 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500  rounded-3xl p-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:underline text-white"  onClick={() => navigate(`/medicines/${title}`)}>View</button>
            </div>
        </div>
    );
};

export default Product;
