import mongoose from "mongoose"

const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    fullname: {
        type: String,
        required: true
    },

    speciality: {
        type: String,
        required: true
    },

    isAvailable: {
        type: Boolean,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export const Doctor = mongoose.model("Doctor", doctorSchema)