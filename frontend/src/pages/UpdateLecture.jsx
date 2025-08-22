import React, { use, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverURL } from "../main";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

function UpdateLecture() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState({});
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // load existing lecture
  useEffect(() => {
    async function fetchLecture() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getlecturebyid/${lectureId}`,
          { withCredentials: true }
        );
        setLecture(response?.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    fetchLecture();
  }, [lectureId]);

  // sync lecture state to fields
  useEffect(() => {
    setTitle(lecture?.title || "");
    setDescription(lecture?.description || "");
    setIsPreviewFree(lecture?.isPreviewFree || false);
  }, [lecture]);

  // handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoUrl(file);
    }
  };

  // update lecture
  async function handleUpdateLecture() {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("isPreviewFree", isPreviewFree);
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      }

      const response = await axios.post(
        `${serverURL}/api/courses/updatelecture/${lectureId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message);
      navigate(-1);
      setUploadLoading(false);
    } catch (error) {
      setUploadLoading(false);
      toast.error(error?.response?.data?.message);
    }
  }

  // remove lecture
  const handleRemoveLecture = async () => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${serverURL}/api/courses/deletelecture/${lectureId}`,
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      setDeleteLoading(false);
      navigate(-1);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full mt-10 lg:max-w-[40%] max-w-[98%] bg-white rounded-xl shadow-lg p-3">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Update Your Lecture
          </h2>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter video title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-sm focus:border-black outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows="3"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-sm focus:border-black outline-none"
          ></textarea>
        </div>

        {/* Video */}
        <div className="mb-4 flex flex-col justify-between">
          <label className="block text-gray-700 text-sm mb-2">Video *</label>
          <div className="flex flex-col lg:flex-row ">
            <input
              type="file"
              accept="video/*"
              name="videoUrl"
              onChange={handleFileChange}
              className="mt-1 lg:w-[50%]  block  text-sm text-gray-500
                        file:mr-3 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-600
                        hover:file:bg-indigo-100 cursor-pointer"
            />
            {videoUrl ? (
              <div className="mt-2 w-full lg:w-[50%] rounded-sm ">
                <video
                  src={URL.createObjectURL(videoUrl)}
                  controls
                />
              </div>
            ) : lecture?.videoUrl ? (
              <div className="mt-2 w-full lg:w-[50%] rounded-sm">
                <video src={lecture?.videoUrl} controls  />
              </div>
            ) : null}
          </div>
        </div>

        {/* Free Checkbox */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPreviewFree}
            onChange={() => setIsPreviewFree(!isPreviewFree)}
            className="w-4 h-4"
          />
          <label className="text-gray-700 text-sm">Is this video FREE</label>
        </div>

        <div className="flex items-center gap-1 justify-between w-full">
          {/* Update Button */}
          <button
            onClick={handleUpdateLecture}
            className=" bg-black w-[50%] cursor-pointer active:bg-gray-700 hover:bg-gray-700 text-white font-semibold py-2 rounded-sm transition"
          >
            {uploadLoading ? (
              <span className="flex justify-center items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span>Please wait ...</span>{" "}
              </span>
            ) : (
              " Update Lecture"
            )}
          </button>

          {/* Remove Button */}
          <button
            onClick={handleRemoveLecture}
            className=" bg-red-600 w-[50%] flex items-center justify-center gap-1 hover:bg-red-700 active:bg-red-700 cursor-pointer text-white font-semibold py-2 rounded-sm  transition"
          >
            {deleteLoading ? (
              <span className="flex justify-center text-sm items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span> wait...</span>{" "}
              </span>
            ) : (
              <span className="text-[15px] justify-center items-center gap-1 flex">
                <AiOutlineDelete className=" text-xl font-bold" />
                <span className="text-md font-semibold">Remove </span>
              </span>
            )}
          </button>
        </div>
      </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default UpdateLecture;
