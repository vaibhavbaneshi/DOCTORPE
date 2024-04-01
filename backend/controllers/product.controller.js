import { Product } from "../model/product.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { razorpay } from "../app.js";

export const getProduct = AsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

export const purchaseProduct = AsyncHandler(async (req, res) => {
    
    const { productAmount } = req.body;

    const options = {
        amount: productAmount,  
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    const order = await razorpay.orders.create(options);

    console.log("Order created successfully:", order);
    res.json({ orderId: order.id });
});

export const createPaymentLink = AsyncHandler( async (req, res) => {
    
})

