import express from "express"
import cors from "cors"
import { router } from "./routes/router.js"
import z from "zod"
import Razorpay from 'razorpay'

export const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

export const zodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string()
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
}); 

app.use("/api/v1", router)

app.get('/', (req, res) => {
    res.json("DoctorPe Backend")
})