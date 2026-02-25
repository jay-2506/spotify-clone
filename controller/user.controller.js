import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.middleware.js";

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        //  existing user 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,

        });
        return res.status(201).json({
            success: true,
            user,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            message: "User not created",
        });
    }
};

// login user 

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        //  Find user by email only
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        //  Generate token
        const token = generateToken(user);


        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
            },
            token
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


// logout 
export const logoutUser = async (req, res) => {
    res.cookie("token", "", {
        maxAge: 0,

    });
    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
}