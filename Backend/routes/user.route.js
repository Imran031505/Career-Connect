import express from "express";
import { login, logout, register, updateProfile, sendOTP, resetPassword, sendResetOTP  } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();



router.route("/send-otp").post(sendOTP);
router.route("/send-reset-otp").post(sendResetOTP);
router.route("/reset-password").post(resetPassword);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload,  updateProfile);


export default router;

