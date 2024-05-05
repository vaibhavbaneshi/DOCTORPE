import React, { useState } from 'react';
import './OrderButton.css'; // Import CSS file
import { useSelector } from 'react-redux';


export const OrderButton = ({ handleClick, animate }) => {
  const { selectedProducts } = useSelector(state => state.user);

  return (
    <div className='rounded-3xl transition duration-700 ease-in-out transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500'>
      <button className={`order ${animate ? 'animate' : ''}`} onClick={handleClick}>
        <span className="default hover:underline">Complete Order</span>
        <span className="success">Order Placed
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <div className="box"></div>
        <div className="truck">
          <div className="back"></div>
          <div className="front">
            <div className="window"></div>
          </div>
          <div className="light top"></div>
          <div className="light bottom"></div>
        </div>
        <div className="lines"></div>
      </button>
    </div>
  );
};

