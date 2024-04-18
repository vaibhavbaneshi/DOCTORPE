import { Doctor } from "../model/doctor.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const searchDoctor = AsyncHandler( async (req, res) => {
    const doctors = await Doctor.find()

    res.json(doctors)
})