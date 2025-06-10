import { Request, Response } from "express"
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import { generateToken } from "../config/token";
import cloudinary from "../config/cloudinary";


export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, password, email } = req.body;

        if (!fullName || !password || !email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: "password must be atleast 6 characters long" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(404).json({ message: "Email already exists" });
            return;
        }

        const newUser = new User({
            fullName,
            password: hashedPassword,
            email,
        })

        if (newUser) {
            generateToken(newUser._id as string, res);
            await newUser.save();
            newUser.password = "";

            res.status(201).json(newUser);
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Unexpected error occurred" })
        }
        console.log("Error in singup controller ", error)
    }
}


export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        generateToken(user._id as string, res);
        user.password = "";

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Unexpected error occurred" })
        }
        console.log("Error in login controller ", error)
    }
}


export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Unexpected error occurred" })
        }
        console.log("Error in logout controller ", error)
    }
}


export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Unexpected error occurred" })
        }
        console.log("Error in checkAuth controller ", error)
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;


        if (!profilePic) {
            res.status(400).json({ message: "profilePic is required" })
            return;
        }

        const uploadedResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadedResponse.secure_url
        }, { new: true }).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Unexpected error occurred" })
        }
        console.log("Error in updateProfile controller ", error)
    }
}