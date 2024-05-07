import React, { useState } from 'react';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';
import "../../pages/ShoppingCart/ShoppingCart.css"
export const ProductInCart = ({ id, title, description, price, image, quantity, onQuantityChange }) => {
    const [productQuantity, setProductQuantity] = useState(quantity || 1);
    const dispatch = useDispatch()

    const increaseQuantity = async () => {
        const newQuantity = productQuantity + 1; 

        const response = await axios.put('https://doctorpe-backend.vercel.app/api/v1/product/updateProductQuantity', {
            id: id,
            quantity: newQuantity
        })

        dispatch(selectProduct(response.data))
        setProductQuantity(newQuantity);
        onQuantityChange(id, newQuantity);
    };
    
    const decreaseQuantity = async () => {
        if (productQuantity > 1) { // Check productQuantity state
            const newQuantity = productQuantity - 1;
            const response = await axios.put('https://doctorpe-backend.vercel.app/api/v1/product/updateProductQuantity', {
                id: id,
                quantity: newQuantity
            })

            dispatch(selectProduct(response.data))
            setProductQuantity(newQuantity);
            onQuantityChange(id, newQuantity);
        }
    };

    return (
        <>
            <div className='Main-ShoppingCart p-4 mt-10 flex items-center bg-white mx-4 rounded-3xl mb-4 shadow-lg'>
                <label htmlFor=""></label>
                <div >
                    <div className='w-60'><img className='w-full h-full' src={image} alt="product image" /></div>
                </div>
                <div className="">
                    <h1><strong>Name :</strong> {title}</h1>
                    <br />
                    <h2><strong>Description :</strong> {description}</h2>
                    <br />
                    <div className="flex">
                        <div><strong>Price :</strong> ₹ {price}</div>
                        <div className="pl-16">
                            <div className="flex">
                            <button onClick={decreaseQuantity}> <svg width="40px" height="25px" viewBox="-291.84 -291.84 1095.68 1095.68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(270)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>triangle-filled</title> <g id="Page-1" strokeWidth="0.00512" fill="none" fillRule="evenodd"> <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)"> <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape"> </path> </g> </g> </g></svg></button>
                                <span>{productQuantity}</span>
                            <button onClick={increaseQuantity}> <svg width="40px" height="25px" viewBox="-291.84 -291.84 1095.68 1095.68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>triangle-filled</title> <g id="Page-1" strokeWidth="0.00512" fill="none" fillRule="evenodd"> <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)"> <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape"> </path> </g> </g> </g></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};