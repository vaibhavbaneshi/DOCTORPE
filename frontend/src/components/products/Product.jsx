import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE = "/images/medicines/medicine.svg";

const Product = ({
    id,
    title,
    image,
    description,
    price,
    reviews,
    rating,
    quantity,
    handleProductSelection,
}) => {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(image || FALLBACK_IMAGE);

    const handleAddToCart = () => {
        handleProductSelection({ id, title, image, description, price, reviews, rating, quantity });
    };

    return (
        <article className="flex h-full w-full min-w-0 flex-col rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5">
            <button
                type="button"
                onClick={() => navigate(`/medicines/${title}`)}
                className="flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
            >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] bg-canvas">
                    <img
                        className="h-full w-full object-contain p-2"
                        src={imgSrc}
                        alt={title}
                        onError={() => setImgSrc(FALLBACK_IMAGE)}
                    />
                </div>
                <h2 className="mt-4 line-clamp-2 text-base font-medium text-ink">{title}</h2>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                    <Rating
                        emptySymbol={<AiOutlineStar aria-hidden="true" className="text-xl text-mute" />}
                        fullSymbol={<AiFillStar aria-hidden="true" className="text-xl text-amber-500" />}
                        initialRating={rating}
                        readonly
                    />
                    <span className="text-sm text-mute">({reviews})</span>
                </div>
            </button>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                    type="button"
                    className="min-h-11 flex-1 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    onClick={() => navigate(`/medicines/${title}`)}
                >
                    View
                </button>
                <button
                    type="button"
                    className="min-h-11 flex-1 rounded-full bg-canopy px-4 py-2 text-sm font-medium text-white hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98]"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>
            </div>
        </article>
    );
};

export default Product;
