import express from "express"
import { createPaymentLink, getProduct, purchaseProduct } from "../controllers/product.controller.js"

export const productRouter = express.Router()

productRouter.get('/getProduct', getProduct)
productRouter.post('/purchaseProduct', purchaseProduct)
productRouter.post('/purchaseProduct/createPaymentLink', createPaymentLink)