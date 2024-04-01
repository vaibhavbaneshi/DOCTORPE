import { Double } from "mongodb"
import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type:  Number,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    reviews: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)