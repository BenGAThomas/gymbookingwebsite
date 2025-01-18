import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "../utility/generateVerificationToken.js";
import { generateJWTToken } from "../utility/generateJWTToken.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../resend/email.js";
import { crypto } from 'crypto';

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

        await sendVerificationEmail(user.email, verificationToken);

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
export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email});
        if(!user) {
            return res.status(400).json({ success: false, message: "User does not exist"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Incorrect Password"});
        }
        const isVerified = user.isVerified;
        if(!isVerified) {
            return res.status(400).json({ success: false, message: "Email is not verified"});
        }

        generateJWTToken(res, user._id);
        res.status(200).json({
            success: true,
            message: "Login is successful",
        })
    } catch (error) {
        console.log("error logging in", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully"});
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpires: { $gt: Date.now() },
        })
        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({ success: true, message: "Email has been verified"});
    } catch (error) {
        console.log("error verifying email", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const forgotPassword = async ( req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000;
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = resetPasswordExpires;

        await user.save();
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/resetpassword/${resetPasswordToken}`);

        res.status(200).json({ success: true, message: "Password reset email sent"});
    } catch (error) {
        console.log("error sending the password reset email", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async ( req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        })
        if(!user) {
            return res.status(400).json({ success: false, message: "User does not exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful"})
    } catch (error) {
        console.log("error resetting password", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async( req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: {...user._doc, password: undefined } })
    } catch (error) {
        console.log("error checking auth", error);
        res.status(400).json({ success: false, message: error.message })
    }
}