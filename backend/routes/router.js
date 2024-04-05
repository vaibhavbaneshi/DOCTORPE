import express from "express"
import { authRouter } from "./auth.router.js"
import { userRouter } from "./user.router.js"
import { chatbotRouter } from "./chatbot.router.js"
import { productRouter } from "./product.route.js"

export const router = express.Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use('/chatbot', chatbotRouter)
router.use('/product', productRouter)
