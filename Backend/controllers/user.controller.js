import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/sendEmail.js"
import mongoose from "mongoose";


const otpStore = {}; // In-memory store

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        // Check if the eady exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please log in.", success: false });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

        // Store OTP in memory (Consider using Redis for better security)
        otpStore[email] = { otp, otpExpiry };

        console.log(`OTP for ${email}: ${otp}`);

        // Send OTP via email
        await sendEmail(email, otp);

        res.status(200).json({ message: "OTP sent successfully", success: true });
    } catch (error) {
        console.error("Error in sendOTP:", error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

export const sendResetOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        // Check if the user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found.", success: false });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

        // Store OTP in memory (Consider using Redis for better security)
        otpStore[email] = { otp, otpExpiry };

        console.log(`Password Reset OTP for ${email}: ${otp}`);

        // Send OTP via email
        await sendEmail(email, otp);

        res.status(200).json({ message: "Password reset OTP sent successfully", success: true });
    } catch (error) {
        console.error("Error in sendResetOTP:", error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmNewPassword } = req.body;

        if (!email || !otp || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match", success: false });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long and include at least one letter and one number",
                success: false,
            });
        }

        // Verify OTP
        if (!otpStore[email]) {
            return res.status(400).json({ message: "OTP expired or invalid", success: false });
        }

        const { otp: storedOtp, otpExpiry } = otpStore[email];

        if (storedOtp !== otp || Date.now() > otpExpiry) {
            return res.status(400).json({ message: "Invalid or expired OTP", success: false });
        }

        delete otpStore[email]; // Clear OTP after successful verification

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await User.updateOne({ email }, { password: hashedPassword });

        return res.status(200).json({ message: "Password reset successful", success: true });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};


export const register = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword, role, otp } = req.body;

        // Check for missing fields
        if (!fullname || !email || !password || !confirmPassword || !role || !otp) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match", success: false });
        }

        // Password strength validation (Minimum 6 characters, at least 1 letter & 1 number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long and include at least one letter and one number",
                success: false,
            });
        }

        // OTP validation
        if (!otpStore[email]) {
            return res.status(400).json({ message: "OTP expired or invalid", success: false });
        }

        const { otp: storedOtp, otpExpiry } = otpStore[email];

        if (storedOtp !== otp || Date.now() > otpExpiry) {
            return res.status(400).json({ message: "Invalid or expired OTP", success: false });
        }

        delete otpStore[email]; // Clear OTP after successful verification

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role,
            verified: true,
        });

        await newUser.save();

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


  
  





export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}




export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.files?.resume?.[0];
        const profilePhotoFile = req.files?.profilePhoto?.[0];

        let resumeUrl, profilePhotoUrl;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            resumeUrl = cloudResponse.secure_url;
        }

        if (profilePhotoFile) {
            const profilePhotoUri = getDataUri(profilePhotoFile);
            const profilePhotoResponse = await cloudinary.uploader.upload(profilePhotoUri.content);
            profilePhotoUrl = profilePhotoResponse.secure_url;
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating user details
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Updating resume
        if (resumeUrl) {
            user.profile.resume = resumeUrl;
            user.profile.resumeOriginalName = file.originalname;
        }

        // Updating profile photo
        if (profilePhotoUrl) {
            user.profile.profilePhoto = profilePhotoUrl;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

