import { signinSchema, signupSchema } from "../utils/validation.js";
import { User } from "../model/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { signUserToken } from "../utils/token.js";
import bcryptjs from "bcryptjs"

const userWithoutPassword = (id) => User.findById(id).select("-password")

export const signup = AsyncHandler( async (req, res) => {
    const {firstName, lastName, username, email, password} = req.body

    const validateInput = signupSchema.safeParse({firstName, lastName, username, email, password})

    if(!validateInput.success) {
        return res.status(400).json({
            message: "Invalid Input",
            status: false
        })
    }

    const existedUser = await User.findOne({ 
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        return res.status(409).json({
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

    const loggedInUser = await userWithoutPassword(user._id)

    if(!loggedInUser) {
        return res.status(500).json({
            message: "There was an error while creating the user",
            status: false
        })
    }

    return res.json({
        message: "Account created successfully",
        data: loggedInUser,
        token: signUserToken(user._id),
        status: true
    })
})

export const signin = AsyncHandler( async (req, res) => {
    const {email, password} = req.body

    const validateInput = signinSchema.safeParse({ email, password })

    if(!validateInput.success) {
        return res.status(400).json({
            message: "Invalid Input",
            status: false
        })
    }

    const existedUser = await User.findOne({ email })

    if(!existedUser) {
        return res.status(400).json({
            message: "User not found",
            status: false
        })
    }

    if(!(bcryptjs.compareSync(password, existedUser.password))) {
        return res.status(400).json({
            message: "Incorrect Password",
            status: false
        })
    }

    const loggedInUser = await userWithoutPassword(existedUser._id)

    return res.json({
        message: "Signed in successfully",
        data: loggedInUser,
        token: signUserToken(existedUser._id),
        status: true
    })
})

export const googleAuth = AsyncHandler( async (req, res) => {
    const {name, firstName, lastName, email, googlePhotoURL} = req.body

    if (!email) {
        return res.status(400).json({
            message: "Email is required",
            status: false
        })
    }

    const user = await User.findOne({ email })
    
    if(user) {
        const loggedInUser = await userWithoutPassword(user._id)

        return res.json({
            message: "Signed in successfully",
            data: loggedInUser,
            token: signUserToken(user._id),
            status: true
        })
    }

    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

    const emailLocal = email.split("@")[0]?.toLowerCase().replace(/\W/g, "") || "user"
    const username = `${emailLocal}${Math.random().toString(36).slice(2, 8)}`

    const newUser = await User.create({
        username,
        firstName: firstName?.trim() || emailLocal,
        lastName: lastName?.trim() || emailLocal,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL
    })

    const loggedInUser = await userWithoutPassword(newUser._id)

    return res.json({
        message: "Account created successfully",
        data: loggedInUser,
        token: signUserToken(newUser._id),
        status: true
    })
})
