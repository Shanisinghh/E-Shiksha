import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../main";
import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [relode, setRelode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all courses
  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getcreatorcourses`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCourses();
  }, [relode]);

  async function handleDelete(courseId) {
    console.log(courseId);
    try {
      const response = await axios.delete(
        `${serverURL}/api/courses/deletecourse/${courseId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      setRelode(!relode);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  if (loading) {
    return (
        <Loader />
    );
  }

  return (
    <div className=" mt-17 max-w-[95vw] min-h-[90vh]  m-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-xl text-lg font-semibold">
          All Created Courses
        </h1>
        <button
          onClick={() => navigate("/createcourse")}
          className="px-4 py-2 cursor-pointer bg-black text-white rounded-sm shadow hover:bg-gray-800 transition"
        >
          Create Course
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto   bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-[16px]">
              <th className="p-4">Course</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="py-4 px-19 md:px-6 ">Action</th>
            </tr>
          </thead>
          <tbody >
            {courses.map((course) => (
              <tr
                key={course._id}
                className="border-b relative hover:bg-gray-50 transition"
              >
                {/* Course */}
                <td className="p-4 flex items-center gap-3">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt="Course picture"
                      className="w-25 h-15 shrink-0 bg-gray-100 rounded-md object-cover"
                    />
                  ) : (
                    <BsCardImage className="w-25 h-15 shrink-0 bg-gray-100 rounded-md object-cover" />
                  )}
                  <span className="text-[15px] font-semibold w-[50vw] md:w-auto">
                    {course.title}
                  </span>
                </td>

                {/* Price */}
                {course.price ? (
                  <td className="md:p-4 text-start text-[15px] font-bold">
                    ₹ {course.price}
                  </td>
                ) : (
                  <td className="p-4 text-[15px] font-bold">₹ NA</td>
                )}

                {/* Status */}
                <td className="p-4">
                  {course.isPublished ? (
                    <div className="md:w-[6vw] w-[19vw] h-[4vh] flex items-center justify-center rounded-sm bg-green-100 text-green-600 text-xs font-medium">
                      Published
                    </div>
                  ) : (
                    <div className="md:w-[6vw] w-[19vw] h-[4vh] flex items-center justify-center rounded-sm bg-red-100 text-red-600 text-xs font-medium">
                      Draft
                    </div>
                  )}
                </td>

                {/* Action */}
                <td className="p-4 absolute top-4   flex items-center gap-1 justify-center">
                  <button
                    onClick={() => navigate(`/UpdateCourse/${course._id}`)}
                    className="px-2 py-1 flex items-center border border-black gap-2  text-black hover:bg-[#106ee2] hover:text-white active:text-white cursor-pointer active:bg-blue-600 rounded-sm transition"
                  >
                    <span className="text-sm font-semibold">Edit </span>
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="px-2 py-1 flex items-center justify-center border border-red-600 gap-1  text-red-600 hover:bg-[#e21010] hover:text-white hover:border-black active:text-white cursor-pointer active:bg-red-600 rounded-sm transition"
                  >
                    <span className="text-sm font-semibold">Remove </span>
                    <AiOutlineDelete className=" text-lg font-bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-center text-sm mt-4">
        A list of your recent courses.
      </p>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />
    </div>
  );
}

export default Courses;
