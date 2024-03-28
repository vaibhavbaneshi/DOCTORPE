import mongoose from "mongoose"

const appointmentSchema = mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Appointment = mongoose.model("Appointment", appointmentSchema)