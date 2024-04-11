import { Product } from "../model/product.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import stripe from "stripe";

const stripeInstance = stripe("sk_test_51P4GrcSGmMcizrM9YUPxIc6tdhAeL29ooNcdmPAxO6tPXuBvhFhprO30oxIDTz2uLDtzdFHs6zWFVWqWfe5UgzVF00zhUvkaBk");

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

export const updateAllProductQuantity = AsyncHandler(async (req, res) => {
    await Product.updateMany({}, { quantity: 1 });
    res.json({ message: 'All product quantities updated successfully.' });
});



export const createCheckoutSession = (async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.title,
                images: [product.image]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/purshaseProductSuccess`,
        cancel_url: "http://localhost:5173/shoppingCart",
    });

    return res.json({
        status: true,
        id: session.id
    });
});
