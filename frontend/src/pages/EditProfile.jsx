import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverURL } from "../main";
import Loader from "../components/Loader";

export default function EditProfile() {
  const user = useSelector((state) => state.user?.user);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    photoUrl: user?.photoUrl || "", // start empty if no photo
    name: user?.name || "",
    discription: user?.discription || "",
    role: user?.role || "",
  });
  const [roleLocked, setRoleLocked] = useState(false);
  console.log(profile);
  const [previewUrl, setPreviewUrl] = useState(profile.photoUrl);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      console.log(url);
      setPreviewUrl(url);
      setProfile({ ...profile, photoUrl: file }); // store file, not just url
    }
  };

  // cleanup blob URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handleEditProfile(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (profile.discription === "" || profile.name === "") {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${serverURL}/api/user/updateprofile`,
        profile,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response?.data?.message || "Profile updated successfully");
      setLoading(false);
      window.location.replace("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white p-3 mt-18 rounded-2xl shadow-lg w-[95%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
        {/* Header */}
        <h2 className="text-xl font-semibold text-center mb-6">Edit Profile</h2>

        <form onSubmit={handleEditProfile} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Avatar"
                className="w-20 h-20 bg-gray-300 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold shadow-md">
                {profile.name ? profile.name[0].toUpperCase() : "U"}
              </div>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-1 focus:border-black outline-none"
            />
          </div>

          {/* Bio / Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="discription"
              value={profile.discription}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows="3"
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 focus:border-black outline-none"
            ></textarea>
          </div>

          <div className="flex gap-3 md:flex-row flex-col md:justify-between md:items-center">
            {/* File Upload */}
            <div className="md:w-[60%]">
              <label className="mt-3 text-sm font-medium">Select Avatar</label>
              <input
                type="file"
                accept="image/*"
                name="photoUrl"
                onChange={handleAvatarChange}
                className="mt-1 block w-full text-sm text-gray-500
                        file:mr-3 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-600
                        hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>
            <div className=" md:w-[40%] md:mt-7">
              <button
                type="button"
                disabled={roleLocked}
                className={`px-4 w-full py-1.5 rounded border transition ${
                  roleLocked
                    ? "bg-gray-900 text-gray-100 border-gray-200 cursor-not-allowed"
                    : profile.role === profile.role
                    ? "bg-white text-black border-gray-300"
                    : "bg-black text-white border-black"
                } `}
                onClick={() => {
                  if (roleLocked) return;

                  const next =
                    profile.role === "Student" ? "Educator" : "Student";
                  setProfile((prev) => ({ ...prev, role: next }));
                  setRoleLocked(true);
                }}
              >
                {roleLocked
                  ? `Role set: ${profile.role}`
                  : `Switch to ${
                      profile.role === "Student" ? "Educator" : "Student"
                    }`}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-900 active:bg-blue-900 cursor-pointer text-white font-medium rounded-sm shadow-md transition-all duration-300 transform"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-1">
                <ClipLoader color="white" size={22} className="pt-1" />{" "}
                <span>Please wait...</span>{" "}
              </span>
            ) : (
              " Save Changes"
            )}
          </button>
        </form>

        {/* Back Button */}
        <FaArrowLeft
          className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
