import express from "express"
import { googleAuth, signin, signup } from "../controllers/auth.controlller.js"
import { requireDb } from "../middleware/requireDb.js"

export const authRouter = express.Router()

authRouter.post("/signup", requireDb, signup)
authRouter.post("/signin", requireDb, signin)
authRouter.post("/google", requireDb, googleAuth)