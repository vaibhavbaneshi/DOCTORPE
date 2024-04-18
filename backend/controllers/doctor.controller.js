import { Doctor } from "../model/doctor.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const searchDoctor = AsyncHandler( async (req, res) => {
    const doctors = await Doctor.find()

    res.json(doctors)
})

export const consultDoctor = AsyncHandler( async (req, res) => {
    const { email, status } = req.body

    const doctor = await Doctor.findOneAndUpdate(
        {email},
        {isAvailable : status},
        { new: true } 
    )

    res.json({
        doctor
    })
})