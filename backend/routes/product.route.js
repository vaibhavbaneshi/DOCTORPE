import express from "express"
import { createCheckoutSession, getProduct, updateProductQuantity } from "../controllers/product.controller.js"
import { requireAuth } from "../middleware/auth.js"

export const productRouter = express.Router()

productRouter.get('/getProduct', getProduct)
productRouter.put('/updateProductQuantity', requireAuth, updateProductQuantity)
productRouter.post('/purchaseProduct/createCheckoutSession', requireAuth, createCheckoutSession)
