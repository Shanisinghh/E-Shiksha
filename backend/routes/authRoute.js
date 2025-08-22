import express from "express";
import { signUp, logIn, logOut, sendOTP, verifyOTP, resetPassword, googleAuth } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", logIn);
authRoute.get("/logout", logOut);
authRoute.post('/sendotp', sendOTP);
authRoute.post('/verifyotp', verifyOTP);
authRoute.post('/resetpassword', resetPassword);
authRoute.post('/googleauth', googleAuth);


export default authRoute;
