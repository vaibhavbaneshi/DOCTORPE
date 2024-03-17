import express from "express"
import cors from "cors"
import { router } from "./routes/router.js"
import z from "zod"

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

app.use("/api/v1", router)