import express from "express"
import { createCheckoutSession, getProduct, updateAllProductQuantity, updateProductQuantity } from "../controllers/product.controller.js"

export const productRouter = express.Router()

productRouter.get('/getProduct', getProduct)
productRouter.put('/updateProductQuantity', updateProductQuantity)
productRouter.put('/updateAllProductQuantity', updateAllProductQuantity)
productRouter.post('/purchaseProduct/createCheckoutSession', createCheckoutSession)

