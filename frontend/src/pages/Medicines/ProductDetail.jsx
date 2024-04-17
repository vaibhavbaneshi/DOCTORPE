import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Rating from 'react-rating';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';

export const ProductDetail = () => {
    const [product, setProducts] = useState([])
    const { title } = useParams();

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

    const [productCount, setProductCount] = useState(0)
    const dispatch = useDispatch()

    const handleProductSelection = (product) => {
        console.log("Adding product to cart:", product);
        setProductCount(product.length)
        dispatch(selectProduct(product))
    };

    return (
        // <Flash left>
            <section className="w-100 h-full  mx-auto px-6 bg-gradient-to-br from-slate-100 to-cyan-100   overflow-y-hidden">
                <Link to="/medicines" className="pt-10 text-black-500 text-lg hover:underline flex items-center space-x-3"><BsArrowLeft /> <span>Back</span></Link><br />
            <div className="flex flex-col w-65 h-screen justify-center items-center">
                {product.filter(item => item.title === title).map(product => (
                    // <>
                        <div key={product.id} className="p-20  w-70 h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                            
                            {/* image  */}
                            <div className='flex flex-col justify-start'>
                                {/* <flash left> */}
                                    <img className="w-16/2 h-70 mx-auto object-cover rounded-2xl" src={product.image} alt="coverimg" />
                                {/* </flash> */}
                            </div>
                            {/* details  */}
                            <div className="flex flex-col justify-center w-100 text-center items-center h-full">
                                {/* <flash left> */}
                                    <div className=" pb-4 flex flex-col items-center">
                                        <h1 className="poppins text-gray-800 text-3xl">{product.title}</h1>
                                        {/* rating and reviews  */}
                                        <div className="flex justify-center items-center-space-x-3 mt-4">
                                            <Rating
                                                emptySymbol={<AiOutlineStar className="text-gray-600 text-xl " />}
                                                fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                                                initialRating={`${product.rating}`}
                                                readonly
                                            />
                                            <span className="text-gray-600">({product.reviews} reviews)</span>
                                        </div>
                                        {/* description  */}
                                        <p className=" text-gray-400  w-3/4 my-4">{product.description}</p>
                                    </div>
                    <button
                //   disabled={disabled}
                  className={`hover:cursor-pointer  rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-cyan-400 text-white py-3 px-20  mb-4 }`}
                  onClick={()=>handleProductSelection(product)}
                >
                    Add to Cart
                </button>
                            </div>
                            
                        </div>
                    // </>
                ))}
            </div>
        </section>
        // </Flash>
    )
}