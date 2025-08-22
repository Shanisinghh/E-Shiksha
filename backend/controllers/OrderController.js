import dotenv from "dotenv";
import Razorpay from "razorpay";
import Course from "../models/coursesModel.js";
import {User} from "../models/userModel.js"

dotenv.config();

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function RazorpayOrder(req, res) {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const options = {
      amount: course.price * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${courseId}`,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    res.status(200).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function RazorpayPaymentVerification(req, res) {
  const { courseId, razorpay_order_id, userId } = req.body;

  const orderInfo = await instance.orders.fetch(razorpay_order_id);
  try {
    if (orderInfo.status === "paid") {
      // Payment is successful
      const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }


      const course = await Course.findById(courseId).populate("lectures");

      if (!course) {
          return res.status(404).json({ message: "Course not found" });
      }

      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }
      res
        .status(200)
        .json({ message: "Payment successful", orderInfo, user, course });
    } else {
      // Payment failed
      res.status(400).json({ message: "Payment failed", orderInfo });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
