import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductInCart } from '../../components/Cart/ProductInCart';
import { loadStripe } from '@stripe/stripe-js'
import { cartTotalAmount, cartTotalItems } from '../../redux/user/userSlice';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const ShoppingCart = () => {
    const navigate = useNavigate();
    const { selectedProducts } = useSelector(state => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");
    const dispatch = useDispatch()
    const [address, setAddress] = useState({ address: "", city: "", state: "", pincode: "" })
    const [addressError, setAddressError] = useState(false)

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

    const addressIsValid = () =>
        Object.values(address).every((value) => value.trim() !== "");

    const handleClick = async () => {
        setCheckoutError("");
        if (!addressIsValid()) {
            setAddressError(true);
            return;
        }
        setAddressError(false);

        dispatch(cartTotalItems(totalItems))
        dispatch(cartTotalAmount(totalAmount))
        setAnimate(true);

        try {
            const response = await api.post("/product/purchaseProduct/createCheckoutSession", {
                products: selectedProducts,
                deliveryAddress: address,
            })

            if (response.data.mock) {
                navigate("/purchaseProductSuccess");
                return;
            }

            const publishableKey =
                stripeKey || response.data.publishableKey;

            if (!publishableKey) {
                setCheckoutError(
                    "Stripe publishable key missing. Add STRIPE_PUBLISHABLE_KEY to backend/.env or VITE_STRIPE_PUBLISHABLE_KEY to frontend/.env."
                );
                setAnimate(false);
                return;
            }

            const stripe = await loadStripe(publishableKey);
            if (response.data.status && stripe && response.data.id) {
                const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
                if (result.error) {
                    setCheckoutError(result.error.message);
                    setAnimate(false);
                }
            } else {
                setCheckoutError("Could not start checkout. Please try again.");
                setAnimate(false);
            }
        } catch (err) {
            setCheckoutError(
                err.response?.data?.message || "Could not start checkout. Please try again."
            );
            setAnimate(false);
        }
    }

    return (
        <div className="min-h-[100dvh] px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <header>
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">Your cart</h1>
                    <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-mute">
                        Review your medicines and add a delivery address before secure checkout.
                    </p>
                </header>
            <div className="flex flex-col gap-10 py-10 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                    <h2 className="mb-4 text-xl font-semibold text-ink">Cart items</h2>
                    <div>
                        {cartItems.length === 0 ? (
                            <div className="rounded-[1.6rem] bg-surface p-10 text-center ring-1 ring-ink/5">
                                <h3 className="text-lg font-semibold text-ink">Your cart is empty</h3>
                                <p className="mt-2 text-mute">Add medicines from the store to begin an order.</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <ProductInCart
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    quantity={item.quantity}
                                />
                            ))
                        )}
                    </div>
                </div>

                <aside className="w-full rounded-[1.6rem] bg-surface p-6 ring-1 ring-ink/5 lg:sticky lg:top-28 lg:w-96">
                    <h2 className="text-xl font-semibold text-ink">Order summary</h2>

                    <div className="mt-6 space-y-4">
                        <div className='flex justify-between'>
                            <span>Total Items</span>
                            <span className="tabular-nums">{totalItems}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Total Amount</span>
                            <span className="font-semibold tabular-nums">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalAmount)}</span>
                        </div>
                        <label className="block text-sm">
                            Address
                            <input name="street-address" autoComplete="street-address" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} className={`mt-1 h-11 w-full rounded-xl border bg-canvas px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${addressError ? 'border-red-700' : 'border-ink/10'}`} type="text" placeholder="221B Park Avenue…"/>
                        </label>
                        <label className="block text-sm">
                            City
                            <input name="address-level2" autoComplete="address-level2" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className={`mt-1 h-11 w-full rounded-xl border bg-canvas px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${addressError ? 'border-red-700' : 'border-ink/10'}`} type="text" placeholder="Bengaluru…"/>
                        </label>
                        <label className="block text-sm">
                            State
                            <input name="address-level1" autoComplete="address-level1" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className={`mt-1 h-11 w-full rounded-xl border bg-canvas px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${addressError ? 'border-red-700' : 'border-ink/10'}`} type="text" placeholder="Karnataka…"/>
                        </label>
                        <label className="block text-sm">
                            Pincode
                            <input name="postal-code" autoComplete="postal-code" inputMode="numeric" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className={`mt-1 h-11 w-full rounded-xl border bg-canvas px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${addressError ? 'border-red-700' : 'border-ink/10'}`} type="text" placeholder="560001…"/>
                        </label>

                        {addressError && (
                            <p className="text-sm text-red-700" aria-live="polite">Fill in every delivery address field.</p>
                        )}
                        {checkoutError && (
                            <p className="text-sm text-red-700" aria-live="polite">{checkoutError}</p>
                        )}

                        <button
                            type="button"
                            disabled={totalItems === 0 || animate}
                            onClick={handleClick}
                            className="min-h-11 w-full rounded-full bg-canopy px-5 py-3 font-medium text-white transition-colors duration-200 ease-spring hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {animate ? "Opening checkout…" : "Checkout"}
                        </button>
                    </div>
                </aside>
            </div>
            </div>
        </div>
    );
};
