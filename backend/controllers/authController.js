import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { sendMail } from "../config/sendMail.js";

export async function signUp(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    // const token = jwt.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );
    // if (token) {
    //   res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production" ? true : false, // true in prod
    //     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-site cookies
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //   });
    // }
    return res
      .status(200)
      .json({ message: "User signed up successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" + error });
  }
}

export async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    if (token) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, // true in prod
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" + error });
  }
}

export async function logOut(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // true in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-site cookies
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" + error });
  }
}

export async function sendOTP(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "send otp error" + error });
  }
}

export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    console.log(typeof user.resetOtp.toString(), typeof otp);
    if (!user || user.resetOtp.toString() !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.isOtpVerified = true;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "verify otp error" + error });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "reset password error" + error });
  }
}
export async function googleAuth(req, res) {
  try {
    const { email, name, role, photoUrl } = req.body;
    // console.log("Google Auth Request:", { email, name, role, photoUrl });
    console.log({ email, name, role, photoUrl });
    let user = await User.findOne({ email });


    // If user doesn't exist → create
    if (!user) {
      user = await User.create({
        email,
        name,
        role: role || "Student", // default role
        photoUrl: photoUrl || "",
      });
    } else {
      // If user exists → update profile data (optional)
      user.name =  user.name || name;
      user.role = role || user.role;
      user.photoUrl = user.photoUrl || photoUrl;
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Clean user object (avoid sending sensitive fields)
    const { password, ...safeUser } = user._doc;

    return res.status(200).json({
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
}


