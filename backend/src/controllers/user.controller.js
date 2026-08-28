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

        req.status(200).json({message: "User successfully created", user: {id: user._id, email: user.email, username: user.username}})
    } catch (error) {
        req.status(500).json({message: "Server Error:", error: error.message})
    }
}

export {registerUser}