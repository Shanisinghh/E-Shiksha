import Course from "../models/coursesModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export async function searchWithAI(req, res) {
  try {
    const { input } = req.body;
    if (typeof input !== "string" || input.trim() === "") {
      return res.status(400).json({ message: "input is required" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const categories = [
      "FullStack Development",
      "Frontend Development",
      "Backend Development",
      "AI / ML",
      "UI UX Designing",
      "App Development",
      "Ethical Hacking",
      "Data Science",
      "Data Analytics",
      "AI Tools",
      "Beginner",
      "Intermediate",
      "Advanced",
    ];
    const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:\n${categories.join(
      "\n"
    )}\n only reply with single keyword from the above list the best matches the user Query . do not explain anything. no extra text Query : ${input}`;

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: new RegExp(input, "i") } },
        { subtitle: { $regex: new RegExp(input, "i") } },
        { description: { $regex: new RegExp(input, "i") } },
        { category: { $regex: new RegExp(input, "i") } },
        { level: { $regex: new RegExp(input, "i") } },
      ],
    });

    if (courses.length > 0) {
      return res.status(200).json({ message: "success", data: courses });
    } else {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const AIResponse = response.text;
      console.log(AIResponse);
      const courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: new RegExp(AIResponse, "i") } },
          { subtitle: { $regex: new RegExp(AIResponse, "i") } },
          { description: { $regex: new RegExp(AIResponse, "i") } },
          { category: { $regex: new RegExp(AIResponse, "i") } },
          { level: { $regex: new RegExp(AIResponse, "i") } },
        ],
      });
      return res.status(200).json({ message: "success", data: courses });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
