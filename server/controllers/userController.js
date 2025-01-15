import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "../utility/generateVerificationToken.js";
import { generateJWTToken } from "../utility/generateJWTToken.js";


export const signup = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        if(!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpires: Date.now() + 10 * 60 * 1000 //10 minutes to verify email address
        })

        await user.save();

        generateJWTToken(res, user._id);

        res.status(201).json({ message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
}
export const login = (req,res) => {
    res.send("Login route");
}
export const logout = (req,res) => {
    res.send("Logout route");
}