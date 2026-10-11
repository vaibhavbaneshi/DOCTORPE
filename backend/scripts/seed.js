import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Doctor } from "../model/doctor.model.js";
import { Product } from "../model/product.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const doctors = [
    {
        username: "dr.mehta.cardio",
        fullname: "Dr. Ananya Mehta",
        speciality: "CARDIOLOGY",
        isAvailable: true,
        email: "ananya.mehta@doctorpe.clinic",
    },
    {
        username: "dr.khan.cardio",
        fullname: "Dr. Rohan Khan",
        speciality: "CARDIOLOGY",
        isAvailable: true,
        email: "rohan.khan@doctorpe.clinic",
    },
    {
        username: "dr.patel.ortho",
        fullname: "Dr. Priya Patel",
        speciality: "ORTHOPEDICS",
        isAvailable: true,
        email: "priya.patel@doctorpe.clinic",
    },
    {
        username: "dr.singh.ortho",
        fullname: "Dr. Vikram Singh",
        speciality: "ORTHOPEDICS",
        isAvailable: true,
        email: "vikram.singh@doctorpe.clinic",
    },
    {
        username: "dr.rao.onco",
        fullname: "Dr. Lakshmi Rao",
        speciality: "CONCOLOGY",
        isAvailable: true,
        email: "lakshmi.rao@doctorpe.clinic",
    },
    {
        username: "dr.sharma.derm",
        fullname: "Dr. Neha Sharma",
        speciality: "DERMATOLOGY",
        isAvailable: true,
        email: "neha.sharma@doctorpe.clinic",
    },
    {
        username: "dr.gupta.derm",
        fullname: "Dr. Arjun Gupta",
        speciality: "DERMATOLOGY",
        isAvailable: true,
        email: "arjun.gupta@doctorpe.clinic",
    },
    {
        username: "dr.iyer.surgery",
        fullname: "Dr. Meera Iyer",
        speciality: "SURGERY",
        isAvailable: true,
        email: "meera.iyer@doctorpe.clinic",
    },
    {
        username: "dr.joshi.lab",
        fullname: "Dr. Kunal Joshi",
        speciality: "LAB ASSISTANT",
        isAvailable: true,
        email: "kunal.joshi@doctorpe.clinic",
    },
    {
        username: "dr.nair.general",
        fullname: "Dr. Sarah Nair",
        speciality: "CARDIOLOGY",
        isAvailable: false,
        email: "sarah.nair@doctorpe.clinic",
    },
];

const loadProducts = () => {
    const jsonPath = path.join(
        __dirname,
        "../../frontend/public/database/products.json"
    );
    const raw = JSON.parse(readFileSync(jsonPath, "utf8"));
    return raw.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        quantity: item.quantity ?? 10,
        image: `/images/medicines/medicine.svg`,
    }));
};

const seed = async () => {
    if (!process.env.MONGO) {
        console.error("MONGO is not set in backend/.env");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO);

    for (const doc of doctors) {
        await Doctor.findOneAndUpdate({ email: doc.email }, doc, {
            upsert: true,
            new: true,
        });
    }

    const products = loadProducts();
    for (const product of products) {
        await Product.findOneAndUpdate({ id: product.id }, product, {
            upsert: true,
            new: true,
        });
    }

    const doctorCount = await Doctor.countDocuments();
    const productCount = await Product.countDocuments();
    console.log(`Seeded ${doctorCount} doctors and ${productCount} products.`);
    await mongoose.disconnect();
};

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
