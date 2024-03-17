import express from "express"
import { searchDoctor } from "../controllers/doctor.controller.js"

export const userRouter = express.Router()

userRouter.get("/searchDoctor", searchDoctor)
