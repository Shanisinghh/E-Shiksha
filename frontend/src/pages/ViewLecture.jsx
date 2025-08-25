import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { serverURL } from "../main";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ViewLecture() {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.user);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [course, setCourse] = useState({});

  const navigate = useNavigate();

  // fetch course by ID
  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getcoursebyid/${courseId}`
        );
        if (response.data.enrolledStudents.includes(user._id)) {
          setCourse(response.data);
        } else {
          navigate("/");
          toast.error("You are not enrolled in this course");
        }

        console.log(response.data.enrolledStudents);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (course.lectures && course.lectures.length > 0) {
      setCurrentLecture(course.lectures[0]);
    }
  }, [course]);

  if (!course || !course.lectures || course.lectures.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex mt-14 lg:h-[94vh] bg-[#f3f4f6] flex-col lg:flex-row lg:gap-5 gap-2 p-1 lg:p-6">
      {/* Left Section - Video + Details */}
      <div className="flex-1 bg-white rounded-lg shadow-md ">
        {/* Back + Title */}

        {/* Video */}
        {currentLecture?.videoUrl ? (
          <div className="w-full  aspect-video bg-black rounded-t-lg overflow-hidden">
            <video
              key={currentLecture._id}
              controls
              className="w-full bg-gray-100 h-full object-cover"
            >
              <source
                src={currentLecture.videoUrl || undefined}
                type="video/mp4"
              />
            </video>
          </div>
        ) : currentLecture ? (
          <div className="w-full bg-black h-[28vh] lg:h-[75vh] text-md rounded-t-md flex items-center justify-center">
            <p className="text-gray-500">Video not available</p>
          </div>
        ) : (
          <div className="w-full lg:h-[75vh] h-[28vh] bg-black text-md rounded-t-md flex items-center justify-center">
            <p className="text-gray-500">Video not available</p>
          </div>
        )}

        {currentLecture && (
          <div className="p-3">
            <h3 className=" font-semibold text-xl">{currentLecture.title||"Lecture Title"}</h3>
            <p className="text-gray-500 text-sm">
              {currentLecture.description||"Lecture Description"}
            </p>
          </div>
        )}
      </div>

      {/* Right Section - Lectures + Instructor */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md py-4 px-3">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xl md:text-2xl font-semibold">{course.title||"Course Title"}</h2>
        </div>

        <p className="text-gray-500 text-md mb-2">
          Category: <span className="font-medium">{course.category||"Category"}</span> |
          Level: <span className="font-medium">{course.level||"Level"}</span>
        </p>
        <h3 className="font-semibold text-md mb-3">All Lectures</h3>

        <div className="flex flex-col overflow-y-scroll lg:h-[46vh] h-[40vh] scrollbar-hide py-1.5 gap-2">
          {course.lectures?.length ? (
            course.lectures.map((lecture) => (
              <button
                key={lecture._id}
                onClick={() => setCurrentLecture(lecture)}
                className={`flex justify-start gap-2 items-center cursor-pointer p-2 pr-4 rounded-md border text-left transition ${
                  currentLecture?._id === lecture._id
                    ? "bg-gray-100 border-gray-400"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                {currentLecture?._id === lecture._id ? (
                  <FaPause className="text-gray-600 text-sm" />
                ) : (
                  <FaPlay className="text-gray-600 text-sm" />
                )}
                {lecture.title}
              </button>
            ))
          ) : (
            <div className="w-full h-full bg-white text-md rounded-md flex items-center justify-center">
              <p className="text-gray-500"> Lectures not available</p>
            </div>
          )}
        </div>

        {/* Instructor */}
        {course.creator && (
          <div className="mt-2 border-t pt-2">
            <h4 className="font-semibold mb-2">Instructor</h4>
            <div className="flex items-center gap-3">
              <img
                src={course.creator.photoUrl}
                alt={course.creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{course.creator.name}</p>
                <p className="text-sm text-gray-500">
                  {course.creator.discription}
                </p>
                <p className="text-xs text-gray-500">{course.creator.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default ViewLecture;
