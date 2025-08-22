import uploadOnCloudinary from "../config/claudinary";
import Course from "../models/coursesModel";
import { Lecture } from "../models/lectureModel";

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
      $push: { lectures: newLecture._id },
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
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res
      .status(200)
      .json({
        message: "Lectures fetched successfully",
        data: course.lectures,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch lectures", error: error.message });
  }
}

export async function updateLecture(req, res) {
  try {
    const { lectureId } = req.params;
    const { title, description } = req.body;

    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);

    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { title, description, videoUrl},
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res
      .status(200)
      .json({ message: "Lecture updated successfully", data: updatedLecture });
  } catch (error) {
    res.status(500).json({ message: "Failed to update lecture", error: error.message });
  }
}


export async function removeLecture(req, res) {
    try {
        const { lectureId } = req.params;
        const deletedLecture = await Lecture.findByIdAndDelete(lectureId);
        if (!deletedLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        res.status(200).json({ message: "Lecture deleted successfully", data: deletedLecture });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete lecture", error: error.message });
    }
}



// //for creating a lecture
// export async function createLecture(req, res) {
//     try {
//         const { courseId } = req.params;
//         const { title, description, videoUrl, isPreviewFree } = req.body;

//         const newLecture = await Lecture.create({
//             title,
//             description,
//             videoUrl,
//             isPreviewFree
//         });

//         res.status(201).json({message: "Lecture created successfully", data: newLecture});
//     } catch (error) {
//         res.status(500).json({message: "Failed to create lecture", error: error.message});
//     }
// }

// //for getting all lectures
// export async function getAllLectures(req, res) {
//     try {
//         const lectures = await Lecture.find();
//         if (!lectures || lectures.length === 0) {
//             return res.status(404).json({ message: "No lectures found" });
//         }
//         res.status(200).json({ message: "Lectures fetched successfully", data: lectures });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch lectures", error: error.message });
//     }
// }

// //for getting a lecture by ID
// export async function getLectureById(req, res) {
//     try {
//         const { lectureId } = req.params;
//         const lecture = await Lecture.findById(lectureId);
//         if (!lecture) {
//             return res.status(404).json({ message: "Lecture not found" });
//         }
//         res.status(200).json({ message: "Lecture fetched successfully", data: lecture });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch lecture", error: error.message });
//     }
// }

// //for updating a lecture
// export async function updateLecture(req, res) {
//     try {
//         const { lectureId } = req.params;
//         const { title, description, videoUrl, isPreviewFree } = req.body;

//         const updatedLecture = await Lecture.findByIdAndUpdate(
//             lectureId,
//             { title, description, videoUrl, isPreviewFree },
//             { new: true }
//         );

//         if (!updatedLecture) {
//             return res.status(404).json({ message: "Lecture not found" });
//         }

//         res.status(200).json({ message: "Lecture updated successfully", data: updatedLecture });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update lecture", error: error.message });
//     }
// }
