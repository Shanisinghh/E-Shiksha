import uploadOnCloudinary from "../config/claudinary.js";
import Course from "../models/coursesModel.js";
import { Lecture } from "../models/lectureModel.js";

export async function createCourse(req, res) {
  try {
    const { title, category } = req.body;
    const userId = req.user.userId;
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }
    const newCourse = await Course.create({
      title,
      category,
      creator: userId,
    });
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course" + error });
  }
}

export async function getPublishedCourses(req, res) {
  try {
    const courses = await Course.find({ published: true });
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No published courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching published courses" + error });
  }
}

export async function getCreaterCourses(req, res) {
  try {
    const userId = req.user.userId;
    const courses = await Course.find({ creator: userId }).populate("lectures");
    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "You have not created any courses yet" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses for this creator" + error });
  }
}

export async function updateCourse(req, res) {
  try {
    const { courseId } = req.params;
    const {
      title,
      category,
      subtitle,
      description,
      level,
      price,
      enrolledStudents,
      lectures,
      reviews,
      isPublished,
    } = req.body;
    // console.log({ title, category ,subtitle, description, level, price, enrolledStudents , lectures, reviews,isPublished});
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        category,
        subtitle,
        description,
        level,
        price,
        enrolledStudents,
        lectures,
        reviews,
        thumbnail,
        isPublished,
      },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error updating course" + error });
  }
}

//get all courses
export async function getCourses(req, res) {
  try {
    const courses = await Course.find().populate("lectures" ).populate("reviews");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
}

export async function getCourseById(req, res) {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate("creator", "name email photoUrl discription")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name email photoUrl ",
        },
      });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course by ID" + error });
  }
}

export async function getCourseByCreatorId(req, res) {
  try {
    const { creatorId } = req.params;
    const courses = await Course.find({ creator: creatorId }).populate("reviews");
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this creator" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses by creator ID" + error });
  }
}

export async function deleteCourse(req, res) {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" + error });
  }
}

//controller for lecture

export async function createLecture(req, res) {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const newLecture = await Lecture.create({
      title,
    });
    // Push the new lecture to the course's lectures array
    await Course.findByIdAndUpdate(courseId, {
      $push: { lectures: newLecture?._id },
    }).populate("lectures");

    res
      .status(201)
      .json({ message: "Lecture created successfully", data: newLecture });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create lecture", error: error.message });
  }
}
export async function getAllLectures(req, res) {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Fetch course with only lectures populated
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Lectures fetched successfully",
      data: course.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch lectures",
      error: error.message,
    });
  }
}

export async function getLectureById(req, res) {
  try {
    const { lectureId } = req.params;

    if (!lectureId) {
      return res.status(400).json({ message: "Lecture ID is required" });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    return res.status(200).json({
      message: "Lecture fetched successfully",
      data: lecture,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch lecture",
      error: error.message,
    });
  }
}

export async function updateLecture(req, res) {
  try {
    const { lectureId } = req.params;
    const { title, description, isPreviewFree } = req.body;

    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      console.log(req.file.path);
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { title, description, isPreviewFree, videoUrl },
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res
      .status(200)
      .json({ message: "Lecture updated successfully", data: updatedLecture });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update lecture", error: error.message });
  }
}

export async function removeLecture(req, res) {
  try {
    const { lectureId } = req.params;
    const deletedLecture = await Lecture.findByIdAndDelete(lectureId);
    if (!deletedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res
      .status(200)
      .json({ message: "Lecture deleted successfully", data: deletedLecture });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete lecture", error: error.message });
  }
}
