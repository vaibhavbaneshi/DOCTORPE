import { Product } from "../model/product.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Stripe from "stripe";

const stripeInstance = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

const frontendUrl = process.env.FRONTEND_URL || "https://doctorpe-frontend.vercel.app";

export const getProduct = AsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

export const updateProductQuantity = AsyncHandler(async (req, res) => {
    const { id, quantity } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
        { id },
        { quantity },
        { new: true }
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
});

export const createCheckoutSession = AsyncHandler(async (req, res) => {
    const { products } = req.body;

    if (process.env.ALLOW_MOCK_CHECKOUT === "true") {
        return res.json({
            status: true,
            mock: true,
            id: "mock_checkout_session",
        });
    }

    if (!stripeInstance) {
        return res.status(503).json({
            status: false,
            message:
                "Payments are not configured. Set STRIPE_SECRET_KEY in backend/.env or ALLOW_MOCK_CHECKOUT=true for local testing.",
        });
    }

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            status: false,
            message: "Cart is empty",
        });
    }

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.title,
                images:
                    product.image?.startsWith("http") ? [product.image] : [],
            },
            unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity: Math.max(1, Number(product.quantity) || 1),
    }));

    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
        return res.status(503).json({
            status: false,
            message:
                "Add STRIPE_PUBLISHABLE_KEY to backend/.env (pk_test_… matching your secret key).",
        });
    }

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${frontendUrl}/purchaseProductSuccess`,
        cancel_url: `${frontendUrl}/shoppingCart`,
    });

    return res.json({
        status: true,
        id: session.id,
        publishableKey,
    });
});
