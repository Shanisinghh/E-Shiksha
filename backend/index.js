import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-shiksha-0114.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/courses", courseRouter);
app.use("/api/order", paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});
