import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../costumHools/getCurrentUser';
import { useCallback } from 'react';

function Profile() {
  const user = useSelector((state) => state.user?.user)
  console.log(user);
  const navigate = useNavigate();

  


  return (
    <div className="flex  items-center  justify-center min-h-screen bg-gray-100">
      <div className="relative  w-[95vw] md:w-[40vw] bg-white p-4 rounded-2xl shadow-md transition-all duration-300">
        {/* Avatar */}
        <div className="flex justify-center">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt="Avatar"
              className="w-20 h-20 bg-gray-300 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold shadow-md">
              {user.name[0].toUpperCase()}
            </div>
          )}
          {/* <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold shadow-md">
            {user.name[0]}
          </div> */}
        </div>

        {/* Name & Role */}
        <div className="text-center mt-2">
          <h2 className="md:text-2xl text-xl font-semibold">{user.name}</h2>
          <p className="text-sm md:text-[15px] text-gray-500">{user.role}</p>
        </div>

        {/* Info Section */}
        <div className="mt-4 space-y-2 md:text-[16px] text-sm text-gray-700">
          <p>
            <span className="font-semibold">Email : </span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Bio : </span>{" "}
            {user.discription || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Enrolled Courses : </span>{user.enrolledCourses.length}
            {user.courses}
          </p>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button onClick={() => navigate("/editprofile")} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-900 active:bg-blue-900 cursor-pointer text-white font-medium rounded-sm shadow-md transition-all duration-300 transform ">
            Edit Profile
          </button>
        </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      </div>

    </div>
  );
}

export default Profile