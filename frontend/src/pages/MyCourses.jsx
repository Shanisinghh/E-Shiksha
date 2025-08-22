import React from "react";
import { FaBook, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const user = useSelector((state) => state.user?.user);

  const navigate = useNavigate();

  console.log(user.enrolledCourses);

  return (
    <div className="min-h-screen mt-15 bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="px-6 md:px-10 lg:px-16 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">My Courses</h1>
        <p className="mt-2 text-gray-600">
          Track your learning journey and continue where you left off.
        </p>
      </div>

      {/* Courses Grid */}
      <section className="px-3 pb-10">
        <div className=" mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {user?.enrolledCourses?.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold leading-tight">
                  {course.title}
                </h3>
                <p className="text-gray-500">{course?.description}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <FaBook /> Instructor: {course.creator?.name || "Unknown"}
                </p>

                {/* Actions */}
                <button
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-black cursor-pointer active:bg-gray-700  text-white hover:bg-gray-800 transition"
                >
                  <FaPlay /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
