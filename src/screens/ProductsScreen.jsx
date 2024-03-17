import React from 'react';
import Flash from 'react-awesome-reveal';
import Heading from '../components/products/Heading';
import Product from '../components/products/Product';
import useFetch from '../hooks/useFetch';

const ProductsScreen = () => {
    const [data] = useFetch('products');

    return (
        <div className=" bg-gray-100  h-full w-full py-24 mx-auto px-6 ">
            <div className="text-2xl font-medium mt-8 font-serif p-10 pl-20">
                <Heading title="Products"/>
            </div>
            <div className='min-h-screen p-3 bg-gray-100 flex items-center justify-center'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-8">
                {data.map(product => (
                    <Flash left key={product.id}>
                        <Product {...product} />
                    </Flash>
                ))}
            </div>
            </div>
        </div>
    )
}

export default ProductsScreen