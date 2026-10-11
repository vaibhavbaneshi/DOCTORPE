import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../../redux/user/userSlice';

export const ProductInCart = ({ id, title, description, price, image, quantity }) => {
    const [productQuantity, setProductQuantity] = useState(quantity || 1);
    const dispatch = useDispatch()

    const updateQuantity = (nextQuantity) => {
        if (nextQuantity < 1) return;
        setProductQuantity(nextQuantity);
        dispatch(selectProduct({ id, title, description, price, image, quantity: nextQuantity }));
    };

    return (
        <article className="mb-4 flex flex-col items-center gap-5 rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5 sm:flex-row">
            <div className="aspect-square w-32 shrink-0 rounded-[1.25rem] bg-canvas p-3">
                <img className="h-full w-full object-contain" src={image} alt={title} width="160" height="160" loading="lazy" />
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-ink">{title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-mute">{description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-6">
                    <p className="font-semibold tabular-nums text-ink">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price)}
                    </p>
                    <div className="flex items-center rounded-full border border-ink/10">
                        <button className="h-11 w-11 rounded-full hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(productQuantity - 1)}>−</button>
                        <span className="min-w-8 text-center tabular-nums" aria-live="polite">{productQuantity}</span>
                        <button className="h-11 w-11 rounded-full hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" type="button" aria-label="Increase quantity" onClick={() => updateQuantity(productQuantity + 1)}>+</button>
                    </div>
                </div>
            </div>
        </article>
    );
};
