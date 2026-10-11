import express from "express";
import { screeningExplain, screeningIntake } from "../controllers/ailab.controller.js";

export const ailabRouter = express.Router();

ailabRouter.post("/intake", screeningIntake);
ailabRouter.post("/explain", screeningExplain);
