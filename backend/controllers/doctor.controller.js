import { Doctor } from "../model/doctor.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const searchDoctor = AsyncHandler( async (req, res) => {
    const { speciality } = req.query
    const filter = speciality && speciality !== "ALL"
        ? { speciality }
        : {}
    const doctors = await Doctor.find(filter)
    res.json(doctors)
})
