import React, { useEffect, useState } from 'react';
import Flash from 'react-awesome-reveal';
import Heading from '../../components/products/Heading';
import Product from '../../components/products/Product';
import ChatBotButton from '../../components/ChatBot/ChatBotButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';

const ProductsScreen = () => {
    const [product, setProducts] = useState([])
    const [productCount, setProductCount] = useState(0)
    const dispatch = useDispatch()


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

    const handleProductSelection = (product) => {
        console.log("Adding product to cart:", product);
        setProductCount(product.length)
        dispatch(selectProduct(product))
    };

    return (
        <div className=" bg-gray-100  h-full w-full pt-4 mx-auto px-6 ">
            <div className="text-2xl font-medium font-serif p-10 pl-20">
                <Heading title="Products" preText={'Our'}/>
            </div>
            <div className='min-h-screen px-3 bg-gray-100 flex items-center justify-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-8">
                        {product.map(item => (
                            <Flash left key={item.id}>
                                <Product {...item} handleProductSelection={handleProductSelection} />
                            </Flash>
                        ))}
                    </div>
                </div>
            <div>
                <ChatBotButton />
            </div>
        </div>
    )
}

export default ProductsScreen;
