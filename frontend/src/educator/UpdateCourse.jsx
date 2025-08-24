import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverURL } from "../main";
import { FaArrowLeft } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

function UpdateCourse() {
  const { courseId } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [course, setCourse] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  useEffect(() => {
    setIsPublished(course.isPublished);
  }, [course.isPublished]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    isPublished: null,
  });
  console.log(isPublished);

  const navigate = useNavigate();

  console.log(formData);

  // Fetch course details using courseId
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getcoursebyid/${courseId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);

  // Populate form with course details
  useEffect(() => {
    if (course && course.title) {
      setFormData({
        title: course.title || "",
        subtitle: course.subtitle || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "",
        price: course.price || "",
        // isPublished: course.isPublished,
      });
    }
  }, [course]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle thumbnail upload
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${serverURL}/api/courses/update/${courseId}`,
        { ...formData, thumbnail, isPublished: isPublished },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      isPublished
        ? toast.success( "Course Published successfully")
        : toast.success( "Course Unpublished successfully");
      setDeleteLoading(false);
      setLoading(false);

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        category: "",
        level: "",
        price: "",
      });
      setThumbnail(null);
      setPreview(null);
      navigate("/courses");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  // Handle course removal
  async function handleRemoveCourse(e) {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${serverURL}/api/courses/deletecourse/${courseId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      setDeleteLoading(false);
      navigate("/courses");
    } catch (error) {
      setDeleteLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen  flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-18 mb-2 w-full md:w-[60vw] max-w-[95vw] shadow-lg rounded-lg p-2 md:p-6"
      >
        {/* Header */}
        <div className="flex md:flex-row flex-col gap-3 justify-between items-center mb-3 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            Add course details
          </h2>
          <button
          onClick={() => navigate(`/createlecture/${courseId}`)}
            type="button"
            className="bg-black text-[15px] cursor-pointer text-white hover:bg-gray-600 active:bg-gray-600 text-sm w-full md:w-auto px-4 py-2 rounded-sm"
          >
            Go to lectures page
          </button>
        </div>

        {/* Danger buttons */}
        <div className="flex w-[100%] gap-3 mb-6">
          <div className="flex w-[100%] gap-2 mt-1">
            <button
              type="button"
              className={`px-8 py-1.5 md:h-[34px] text-sm w-[50%] md:w-auto cursor-pointer rounded border ${
                isPublished
                  ? "bg-green-500 text-white border-black"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => setIsPublished(!isPublished)}
            >
              Publish
            </button>
            <button
              type="button"
              className={`px-8 py-1.5 md:h-[34px] text-sm w-[50%] md:w-auto cursor-pointer rounded border ${
                !isPublished
                  ? "bg-red-500 text-white border-black"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => setIsPublished(!isPublished)}
            >
              UnPublish
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter course subtitle"
            className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter course description"
            rows="3"
            className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
          />
        </div>

        {/* Category, Level, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
            >
              <option value="">Select category</option>
              <option value="FullStack Development">
                FullStack Development
              </option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="ai">AI / ML</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="App Development">App Development</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="AI Tools">AI Tools</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Course Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (INR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="mb-6 flex gap-4">
          <div className="md:w-[80%] w-[60%]">
            <label className="block mb-2 font-medium">Course Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleThumbnail}
              className="mt-1 block w-[100%] text-sm text-gray-500
                        file:mr-3 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-600
                        hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>

          {preview ? (
            <img
              src={preview}
              alt=""
              className=" md:w-[20%] w-[35%] bg-[#f1e7e7] max-h-60 object-cover rounded-sm border"
            />
          ) : course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt="Course Thumbnail"
              className=" md:w-[20%] w-[35%] bg-amber-50 max-h-60 object-cover rounded-sm border"
            />
          ) : null}
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-2">
          <button
            type="submit"
            className="px-5 py-1.5 hover:bg-gray-800 active:bg-gray-800 cursor-pointer bg-black text-white rounded-md"
          >
            {loading ? (
              <span className="flex justify-center text-sm items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span>Please wait...</span>{" "}
              </span>
            ) : (
              <span className="text-[15px]">Save Changes</span>
            )}
          </button>
          <button
            onClick={handleRemoveCourse}
            type="button"
            className="px-4 py-2  hover:bg-red-400 active:bg-red-400  md:w-auto cursor-pointer bg-red-500 text-white rounded-sm text-sm"
          >
            {deleteLoading ? (
              <span className="flex justify-center items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span>Please wait...</span>{" "}
              </span>
            ) : (
              <span className="text-[15px] flex items-center gap-1"> <AiOutlineDelete className=" text-lg font-bold" />Remove</span>
            )}
          </button>
        </div>
      </form>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate("/courses")}
      />
    </div>
  );
}

export default UpdateCourse;
