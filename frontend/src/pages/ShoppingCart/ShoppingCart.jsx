import React, { useEffect, useState } from 'react';
import Heading from "../../components/products/Heading";
import { useDispatch, useSelector } from 'react-redux';
import { ProductInCart } from '../../components/Cart/ProductInCart';
import { OrderButton } from '../../components/OrderButton/OrderButton';
import { loadStripe } from '@stripe/stripe-js'
import axios from "axios";
import { cartTotalAmount, cartTotalItems } from '../../redux/user/userSlice';
import ChatBotButton from '../../components/ChatBot/ChatBotButton';

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

        const response = await axios.post(`https://doctorpe-backend.vercel.app/api/v1/product/purchaseProduct/createCheckoutSession`, {
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
        <div className="bg-slate-100 h-screen pt-12 mx-auto px-6">
            <div>
                <div>
                    <Heading title={'Orders'} preText={'My'} />
                </div>

                <div className="flex justify-between bg-slate-100">
                    <div className="bg-slate-100 w-3/4 mr-28">
                        <div>
                            <div className="text-2xl pl-4 font-semibold mb-4">Cart Items</div>
                            <div>
                                {cartItems.length === 0 ? (
                                    <div className='flex flex-col items-center'>
                                            There are no items in the cart currently...
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

                    <div className="bg-white w-1/4 h-80 mt-12 rounded-3xl">
                        <div className='p-4 flex flex-col items-center text-2xl'>
                            <strong>Your Items</strong>
                        </div>

                        <div>
                            <div className='flex justify-between p-5 text-sm'>
                                <div>
                                    Total Items :
                                </div>

                                <div>
                                    {totalItems}
                                </div>
                            </div>

                            <div className='flex justify-between p-5 text-sm'>
                                <div>
                                    Total Amount :
                                </div>

                                <div>
                                ₹ {totalAmount.toFixed(2)}
                                </div>
                            </div>

                            <div onClick={handleClick} className='flex flex-col items-center pt-14'>
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
            <div>
                <ChatBotButton />
            </div>
        </div>
    );
};
