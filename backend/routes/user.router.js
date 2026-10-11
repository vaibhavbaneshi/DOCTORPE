import express from "express"
import { searchDoctor } from "../controllers/doctor.controller.js"
import { bookAppointment, deleteAppointment, fetchAppointment } from "../controllers/appointment.controller.js"
import { updateHealthProfile } from "../controllers/user.controller.js"
import { requireAuth } from "../middleware/auth.js"

export const userRouter = express.Router()

userRouter.get("/searchDoctor", searchDoctor)
userRouter.patch("/healthProfile", requireAuth, updateHealthProfile)
userRouter.get("/fetchAppointment", requireAuth, fetchAppointment)
userRouter.post("/bookAppointment", requireAuth, bookAppointment)
userRouter.delete("/deleteAppointment", requireAuth, deleteAppointment)
