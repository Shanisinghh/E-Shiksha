import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { serverURL } from "../main";
import { ClipLoader } from "react-spinners";
import { AiOutlineDelete } from "react-icons/ai";

function CreateLecture() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [newLecture, setNewLecture] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchLectures() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getalllectures/${courseId}`,
          { withCredentials: true }
        );
        console.log(response?.data.data);
        setLectures(response?.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    fetchLectures();
  }, [courseId, dataLoading]);

  // Add a new lecture
  async function handleAddLecture() {
    setLoading(true);
    if (!newLecture) {
      toast.error("Please enter a  title");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${serverURL}/api/courses/createlecture/${courseId}`,
        { title: newLecture },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      setDataLoading(!dataLoading);
      setNewLecture("");
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  }

  // Delete a lecture
  async function handleDeleteLecture(lectureId) {
    try {
      const response = await axios.delete(
        `${serverURL}/api/courses/deletelecture/${lectureId}`,
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      setDataLoading(!dataLoading);

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-1 py-2 ">
      <div className="w-full mt-10 lg:max-w-[50%] max-w-[99%] bg-white rounded-xl shadow-lg lg:p-3 p-3">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Let's Add a Lecture
        </h2>
        <p className="text-gray-500 mb-4 text-sm sm:text-base">
          Enter the title and add your video lectures to enhance your course
          content.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="e.g. Introduction to Mern Stack"
          value={newLecture}
          onChange={(e) => setNewLecture(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:border-black outline-none"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <button
            onClick={() => navigate(`/courses`)}
            className="flex items-center active:bg-gray-300 cursor-pointer justify-center gap-2 bg-gray-200 text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            <FaArrowLeft /> Back to Course
          </button>
          <button
            onClick={handleAddLecture}
            className="flex items-center cursor-pointer active:bg-gray-800 justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span>Please wait...</span>{" "}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <FiPlus className="text-lg text-white" /> Create Lecture
              </span>
            )}
          </button>
        </div>

        {/* Lecture List */}
        <div className=" min-h-[50vh] w-full  overflow-y-scroll lg:overflow-x-hidden scrollbar-hide overflow-x-scroll">
          {lectures?.map((lecture, index) => (
            <div
              key={lecture._id}
              className="flex my-1 justify-between w-[130%] md:w-full  items-center  bg-gray-100 px-2 py-3 rounded-md text-gray-800"
            >
              <span className="text-sm sm:text-base pr-2  font-medium ">
                <span className="hidden md:inline"> Lecture-</span>
                {index + 1} : {lecture.title}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigate(`/updatelecture/${lecture._id}`)}
                  className="px-3 py-1 flex items-center border border-black gap-2  text-black hover:bg-[#106ee2] hover:text-white active:text-white cursor-pointer active:bg-blue-600 rounded-sm transition"
                >
                  <span className="text-sm font-semibold">Edit </span>
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteLecture(lecture._id)}
                  className="px-2 py-0.5 flex items-center border border-red-600 gap-1  text-red-600 hover:bg-[#e21010] hover:text-white hover:border-black active:text-white cursor-pointer active:bg-red-600 rounded-sm transition"
                >
                  <AiOutlineDelete className=" text-lg font-bold" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
