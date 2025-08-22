import e from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            default:""
        },
        photoUrl:{
            type: String,
            default:""
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
           
        },
        role:{
            type: String,
            enum: ["Student", "Educator"],
            required: true
        },
        enrolledCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }],
        resetOtp: {
            type: Number,
        },
        resetOtpExpire: {
            type: Date,
        },
        isOtpVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


export const User = mongoose.model("User", userSchema);
