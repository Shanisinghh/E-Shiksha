import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { serverURL } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    console.log("Course Created:", { title, category });
    try {
      const response = await axios.post(
        `${serverURL}/api/courses/create`,
        { title, category },
        { withCredentials: true }
      );
      console.log(response);
      toast.success(response?.data?.message);
      setLoading(false);
      setTitle("");
      setCategory("");
      Navigate("/courses");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className=" md:w-[40vw] w-[95vw]  mx-auto bg-white shadow-md rounded-xl p-4 mt-10">
        {/* Header */}
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-center w-full">
            Create Course
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Enter course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-4 py-1 outline-none focus:border-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-4 py-1 outline-none focus:border-black"
            >
              <option value="">Select category</option>
              <option value="FullStack Development">
                FullStack Development
              </option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="AI / ML">AI / ML</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="App Development">App Development</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="AI Tools">AI Tools</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white py-2 rounded-sm hover:bg-gray-800 transition"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span>Please wait...</span>{" "}
              </span>
            ) : (
              " Create Course"
            )}
          </button>
        </form>
      </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() =>Navigate(-1)}
      />
    </div>
  );
}

export default CreateCourse;
