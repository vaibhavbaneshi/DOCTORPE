import { useEffect, useState } from 'react';
import Product from '../../components/products/Product';
import ChatBotButton from '../../components/ChatBot/ChatBotButton';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';
import { SuccessMessage } from '../../components/Alert/SuccessMessage';
import LoadingProduct from '../../components/products/LoadingProduct';
import { api } from '../../lib/api';

const ProductsScreen = () => {
    const [product, setProducts] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/product/getProduct');
                setProducts(response.data);
            } catch {
                setError("Could not load products.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [])

    useEffect(() => {
        if (!showAlert) return undefined;
        const timer = setTimeout(() => setShowAlert(false), 2500);
        return () => clearTimeout(timer);
    }, [showAlert]);

    const handleProductSelection = (selected) => {
        setShowAlert(true)
        dispatch(selectProduct({ ...selected, quantity: 1 }))
    };

    return (
        <div className="mx-auto min-h-[100dvh] max-w-6xl px-4 py-16">
            {showAlert && <SuccessMessage message={`Item added to the cart`} />}
            <header>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
                    Everyday care, delivered
                </h1>
                <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-mute">
                    Browse medicines and health essentials, then add what you need to one secure cart.
                </p>
            </header>
            {error && <p className="mt-8 text-red-700" aria-live="polite">{error} Refresh the page to try again.</p>}
            { isLoading ? (
                <div className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading medicines">
                    <LoadingProduct/><LoadingProduct/><LoadingProduct/><LoadingProduct/>
                </div>
            ) : product.length === 0 ? (
                <div className="mt-12 rounded-[1.6rem] bg-surface p-10 text-center ring-1 ring-ink/5">
                    <h2 className="text-xl font-semibold text-ink">The shelves are being updated</h2>
                    <p className="mt-2 text-mute">Check again shortly for available medicines.</p>
                </div>
            ) : (
                <section aria-label="Medicines" className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {product.map(item => (
                        <Product key={item.id} {...item} handleProductSelection={handleProductSelection} />
                    ))}
                </section>
            )}
            <ChatBotButton />
        </div>
    )
}

export default ProductsScreen;
