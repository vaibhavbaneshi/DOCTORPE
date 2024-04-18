import express from "express"
import { consultDoctor, searchDoctor } from "../controllers/doctor.controller.js"
import { bookAppointment, deleteAppointment, fetchAppointment } from "../controllers/appointment.controller.js"

export const userRouter = express.Router()

userRouter.get("/searchDoctor", searchDoctor)
userRouter.get("/fetchAppointment", fetchAppointment)
userRouter.post("/bookAppointment", bookAppointment)
userRouter.delete("/deleteAppointment", deleteAppointment)