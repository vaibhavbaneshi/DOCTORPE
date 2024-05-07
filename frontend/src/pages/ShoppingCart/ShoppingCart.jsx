import React, { useEffect, useState } from 'react';
import Heading from "../../components/products/Heading";
import { useDispatch, useSelector } from 'react-redux';
import { ProductInCart } from '../../components/Cart/ProductInCart';
import { OrderButton } from '../../components/OrderButton/OrderButton';
import { loadStripe } from '@stripe/stripe-js'
import axios from "axios";
import "./ShoppingCart.css"
import { cartTotalAmount, cartTotalItems } from '../../redux/user/userSlice';

export const ShoppingCart = () => {
    const { selectedProducts } = useSelector(state => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [animate, setAnimate] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        setCartItems(selectedProducts);
    }, [selectedProducts]);

    useEffect(() => {
        if (cartItems.length > 0) {
            let total = 0;
            let itemsCount = 0;
            cartItems.forEach(item => {
                const quantity = item.quantity !== undefined ? item.quantity : 1; 
                if (!isNaN(quantity)) {
                    total += item.price * quantity; 
                    itemsCount += quantity; 
                }
            });
            setTotalAmount(total);
            setTotalItems(itemsCount);
        } else {
            setTotalAmount(0);
            setTotalItems(0);
        }
    }, [cartItems]);
    
    const handleQuantityChange = (productId, quantity) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const handleClick = async () => {

        dispatch(cartTotalItems(totalItems))
        dispatch(cartTotalAmount(totalAmount))

        if (!animate) {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
            }, 10000);
        }

        const stripe = await loadStripe("pk_test_51P4GrcSGmMcizrM94ZF4gAIGxKyWSKpidAGQgksJ06zdo3Vt9ZR1jqRcnC7CBbzXDPolgJUUpeeWYktSn62JloV500ZzuN3Mcn")

        const response = await axios.post("https://doctorpe-backend.vercel.app/api/v1/product/purchaseProduct/createCheckoutSession", {
            products: selectedProducts,
        })

        const session = response.data.id

        setTimeout(() => {
            if(response.data.status) {
                stripe.redirectToCheckout({
                    sessionId: session
                })
            } 
        }, 7000)
    }
    
    return (
        <div className="bg-gradient-to-br from-slate-100 to-cyan-100 min-h-screen pt-12 mx-auto px-6">
            <div>
                <div>
                    <Heading title={'Orders'} preText={'My'} />
                </div>

                <div className="flex justify-between p-10 mb-8 ">
                    <div className=" mr-28">
                        <div >
                            <div className="cart-items pl-4 mb-4">Cart Items</div>
                            <div className='cartItems-Card '>
                                {cartItems.length === 0 ? (
                                    <div className='empty-text '>
                                            There are no items in the cart currently
                                    </div>
                                ) : (
                                    cartItems.map((item, index) => (
                                        <ProductInCart 
                                            key={index}
                                            id={item.id}
                                            title={item.title} 
                                            description={item.description} 
                                            price={item.price} 
                                            image={item.image}
                                            quantity={item.quantity}
                                            onQuantityChange={handleQuantityChange}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="yourItems bg-white w-1/4 h-3/4 mt-20 rounded-3xl shadow-xl">
                        <div className='yourItems-head p-4 mt-6 flex flex-col items-center text-2xl'>
                            <strong>Checkout Details</strong>
                        </div>

                        <div className='p-10'>
                            <div className='flex justify-between p-5 text-xl'>
                                <div>
                                    Total Items :
                                </div>

                                <div className='pr-6'>
                                    {totalItems}
                                </div>
                            </div>

                            <div className='flex justify-between p-5 text-xl'>
                                <div>
                                    Total Amount :
                                </div>

                                <div>
                                ₹ {totalAmount.toFixed(2)}
                                </div>
                            </div>

                            <div className='flex justify-between p-5 text-xl'>
                                <span>Your Address :</span>
                                <input className='rounded-lg' type="text" placeholder='Your Address'/>
                            </div>
                            <div className='flex justify-between p-5 text-xl'>
                                <span>City :</span>
                                <input className='rounded-lg' type="text" placeholder='City'/>
                            </div>
                            <div className='flex justify-between p-5 text-xl'>
                                <span>State :</span>
                                <input className='rounded-lg' type="text" placeholder='State'/>
                            </div>
                            <div className='flex justify-between p-5 text-xl'>
                                <span>Pincode : </span>
                                <input className='rounded-lg' type="text" placeholder='Pincode'/>
                            </div>

                            <div onClick={handleClick} className='complete-order mt-6 flex flex-col items-center pt-9'>
                                {totalItems > 0 || totalAmount > 0 ? ( // Check if either totalItems or totalAmount is greater than 0
                                    <OrderButton onClick={handleClick} animate={animate}/>
                                ) : (
                                    <button disabled className="order" style={{ cursor: 'not-allowed' }}>
                                        <span className="default hover:underline">Complete Order</span>
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
