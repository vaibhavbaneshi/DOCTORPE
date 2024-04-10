import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Rating from 'react-rating';
import { Link, useParams } from 'react-router-dom';
import Flash from 'react-awesome-reveal';

export const ProductDetail = () => {
    const [disabled, setDisabled] = useState(false);
    const [product, setProducts] = useState([])
    const { title } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/product/getProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [])

    return (
        <Flash left>
            <section className="max-w-screen-xl mx-auto px-6  overflow-y-hidden">
            <div className="flex flex-col justify-center items-center">
                {product.filter(item => item.title === title).map(product => (
                    <>
                        <div key={product.id} className="p-6 box-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                            {/* image  */}
                            <div>
                                {/* <flash left> */}
                                    <img className="w-full h-full mx-auto object-cover rounded-lg" src={product.image} alt="coverimg" />
                                {/* </flash> */}
                            </div>
                            {/* details  */}
                            <div className="flex flex-col justify-center h-full">
                                {/* <flash left> */}
                                    <div className="border-b border-gray-400 pb-4">
                                        <h1 className="poppins text-gray-800 text-3xl">{product.title}</h1>
                                        {/* rating and reviews  */}
                                        <div className="flex items-center-space-x-3 mt-4">
                                            <Rating
                                                emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
                                                fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                                                initialRating={`${product.rating}`}
                                                readonly
                                            />
                                            <span className="text-gray-600">({product.reviews} reviews)</span>
                                        </div>
                                        {/* description  */}
                                        <p className=" text-gray-400 my-4">{product.description}</p>
                                    </div>
                            </div>
                            <Link to="/medicines" className="pt-4 text-blue-500 text-sm hover:underline flex items-center space-x-3"><BsArrowLeft /> <span>Back</span></Link>
                        </div>
                    </>
                ))}
            </div>
        </section>
        </Flash>
    )
}