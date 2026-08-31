import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // no empty validation

        if (!username || !email || !password) {
            return res.status(400).json({message: "Please fill out all fields"})
        }

        // check if user already exits
        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) {
            return res.status(400).json({message: "User already exists"})
        }

        // create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        })

        res.status(200).json({message: "User successfully created", user: {id: user._id, email: user.email, username: user.username}})
    } catch (error) {
        res.status(500).json({message: "Server Error:", error: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        //check if user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        })

        if (!user) return res.status(400).json({
            message: "User does not exist"
        })

        //compare passwords
        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        res.status(200).json({
            message: "Successfully logged in",
            user: {
                id: user._id,
                email: user.email.toLowerCase(),
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

export {registerUser, loginUser}