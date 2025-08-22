import Course from "../models/coursesModel.js";
import Review from "../models/reviewModel.js";

export async function createReview(req, res) {
  const userId = req.user.userId;
  console.log(req.user);
  const { courseId, rating, comment } = req.body;

  if (!courseId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const course = await Course.findById(courseId);
  console.log(course);
  if (!course.enrolledStudents.includes(userId)) {
    return res.status(403).json({ message: "You must be enrolled in the course to leave a review" });
  }

  try {
    const response = await Review.create({
      user: userId,
      course: courseId,
      rating,
      comment,
    });
    res
      .status(201)
      .json({ message: "Review created successfully", review: response });

    await Course.findByIdAndUpdate(courseId, {
      $push: { reviews: response._id },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
