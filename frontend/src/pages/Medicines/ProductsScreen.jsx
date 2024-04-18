import React, { useEffect, useState } from 'react';
import Heading from '../../components/products/Heading';
import Product from '../../components/products/Product';
import ChatBotButton from '../../components/ChatBot/ChatBotButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';
import { SuccessMessage } from '../../components/Alert/SuccessMessage';
import { SkeletonLoader } from '../../components/Loader/SkeletonLoader';

const ProductsScreen = () => {
    const [product, setProducts] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://doctorpe-backend.vercel.app/api/v1/product/getProduct`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

    }, [])
    
    const handleProductSelection = (product) => {
        setShowAlert(true)
        dispatch(selectProduct(product))
    };

    setTimeout(() => {
        setShowAlert(false)
    }, 5000)

    setTimeout(() => {
        setShowLoader(false)
    }, 2000)

    return (
        <div className=" bg-gradient-to-br from-slate-100 to-cyan-100  h-full w-full pt-3 mx-auto px-6 ">
            {showAlert && <SuccessMessage message={`Item added to the cart`} />}
            <div className="text-2xl font-medium font-serif p-10 pl-20">
                <Heading title="Products" preText={'Our'}/>
            </div>
            <div className='min-h-screen px-3  flex items-center justify-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-8">
                        {product.map(item => (                          
                            <Product key={Math.random()} {...item} handleProductSelection={handleProductSelection} />
                        ))}
                    </div>
                </div>
            {showLoader ? <SkeletonLoader/> : <div className="grid grid-cols-5">
                {filteredUsers.map(user => (
                    user.isAvailable ? <DoctorCard key={user._id} onClick={() => handleOnClick(user.email, user.fullname)} name={user.fullname} email={user.email} description={"Sample Description"} speciality={user.speciality} label={"Consult Now"}/> : <></>
                ))}
            </div>}
            <div>
                <ChatBotButton />
            </div>
        </div>
    )
}

export default ProductsScreen;