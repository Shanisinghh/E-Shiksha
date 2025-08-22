import {User} from "../models/userModel.js";
import uploadOnCloudinary from "../config/claudinary.js";
import { populate } from "dotenv";


export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user.userId).select("-password").populate("enrolledCourses").populate({ path: "enrolledCourses", populate: {path:"creator", select:"name email"}} );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error"+error });
    }
}



export async function updateProfile(req, res) {
    try {
        const userId = req.user.userId;
        console.log(userId);
        const { name, discription, role } = req.body;
        console.log({ name, discription, role });
        let photoUrl
        if (req.file) {
            photoUrl =await uploadOnCloudinary(req.file.path);
        }
       const user = await User.findByIdAndUpdate(userId, { name, discription , role, photoUrl });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile updated successfully" , user });

    } catch (error) {
        res.status(500).json({ message: "update profile error"+error });
    }
}