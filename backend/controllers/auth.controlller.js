import { zodSchema } from "../app.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"
import { AsyncHandler } from "../utils/AsyncHandler.js";
import bcryptjs from "bcryptjs"

export const signup = AsyncHandler( async (req, res) => {
    const {firstName, lastName, username, email, password} = req.body

    const validateInput = zodSchema.safeParse({firstName, lastName, username, email, password})

    if(!validateInput) {
        return res.json({
            message: "Invalid Input",
            status: false
        })
    }

    const existedUser = await User.findOne({ 
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        return res.status(401).json({
            message: "User with this email or username already exist",
            status: false
        })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        username: username?.toLowerCase(),
        email,
        password: hashedPassword
    })

    const createdUser = await User.findById(user._id)

    if(!createdUser) {
        return res.status(500).json({
            msg: "There was an error while creating the user",
            status: false
        })
    }

    const userId = user._id

    const token = jwt.sign({
        userId,
    }, process.env.JWT_SECRET)

    const loggedInUser = await User.findById(user._id).select(" -password ")

    return res.json({
        msg: "User Signed in successfully",
        data: loggedInUser,
        token: token,
        status: true
    })
})

export const signin = AsyncHandler( async (req, res) => {
    const {email, password} = req.body

    const validateInput = zodSchema.safeParse({ email, password })

    if(!validateInput) {
        return res.status(400).json({
            message: "Invalid Input",
            status: false
        })
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })

    if(!existedUser) {
        return res.status(400).json({
            message: "User not found",
            status: false
        })
    }

    const validUserPassword = existedUser.password

    if(!(bcryptjs.compareSync(password, validUserPassword))) {
        return res.status(400).json({
            message: "Incorrect Password",
            status: false
        })
    }

    const userId = existedUser._id

    const token = jwt.sign({
        userId,
    }, process.env.JWT_SECRET)

    const loggedInUser = await User.findById(existedUser._id).select(" -password ")

    return res.json({
        msg: "User Signed up successfully",
        data: loggedInUser,
        token: token,
        status: true
    })
})