import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Rating from 'react-rating';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';
import { api } from '../../lib/api';

export const ProductDetail = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { title } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/product/getProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [])

    const matched = products.filter((item) => item.title === title)

    return (
        <section className="mx-auto min-h-[100dvh] w-full max-w-6xl px-4 py-12 sm:px-6">
            <Link to="/medicines" className="inline-flex min-h-11 items-center gap-3 rounded-full px-3 text-canopy hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy">
                <BsArrowLeft /> <span>Back</span>
            </Link>
            <div className="flex min-h-[70vh] flex-col items-center justify-center">
                {isLoading ? (
                    <p className="text-slate-600">Loading product…</p>
                ) : matched.length === 0 ? (
                    <p className="text-slate-600">This product could not be found.</p>
                ) : matched.map((item) => (
                    <div key={item.id} className="grid w-full max-w-5xl grid-cols-1 gap-10 py-10 md:grid-cols-2">
                        <div className="aspect-square rounded-[2rem] bg-surface p-6 ring-1 ring-ink/5">
                            <img className="h-full w-full rounded-[1.6rem] object-contain" src={item.image} alt={item.title} width="640" height="640" onError={(e) => { e.currentTarget.src = "/images/medicines/medicine.svg"; }} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{item.title}</h1>
                            <div className="mt-4 flex items-center">
                                <Rating
                                    emptySymbol={<AiOutlineStar aria-hidden="true" className="text-xl text-mute" />}
                                    fullSymbol={<AiFillStar aria-hidden="true" className="text-xl text-amber-500" />}
                                    initialRating={`${item.rating}`}
                                    readonly
                                />
                                <span className="ml-2 tabular-nums text-mute">({item.reviews} reviews)</span>
                            </div>
                            <p className="my-6 max-w-[65ch] leading-relaxed text-mute">{item.description}</p>
                            <p className="mb-6 text-3xl font-semibold tabular-nums text-ink">
                                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(item.price)}
                            </p>
                            <button
                                type="button"
                                className="min-h-11 w-full rounded-full bg-canopy px-7 py-3 font-medium text-white transition-colors duration-200 ease-spring hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98] sm:w-fit"
                                onClick={() => dispatch(selectProduct({ ...item, quantity: 1 }))}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
