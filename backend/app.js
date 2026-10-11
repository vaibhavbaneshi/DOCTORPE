import express from "express"
import cors from "cors"
import { router } from "./routes/router.js"
import Razorpay from 'razorpay'

export const app = express()

const allowedOrigins = [
    "https://doctorpe-frontend.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL)
}

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // shortcut: local Vite ports vary; allow localhost dev only
        if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true,
}))

app.use(express.json())

export const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    : null

app.get("/health", (_req, res) => {
    res.json({
        status: true,
        service: "doctorpe-backend",
        database: app.locals.database || "disconnected",
    })
})

app.use("/api/v1", router)

app.use((_req, res) => {
    res.status(404).json({ status: false, message: "Not found" })
})

app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message || "Internal server error",
    })
})
