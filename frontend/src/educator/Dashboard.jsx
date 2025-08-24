import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../components/Loader";
import { use } from "react";

export default function Dashboard() {
  const [progressData, setProgressData] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  // Fetch all courses
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getcreatorcourses`,
          {
            withCredentials: true,
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);

  // build graph data when courses change
  console.log(courses);
  useEffect(() => {
    if (courses.length > 0) {
      const progress = courses
        .filter((course) => course.isPublished === true)
        .map((course) => ({
          name: course.title,
          value: course?.lectures.length,
        }));

      const enrollment = courses
        .filter((course) => course.isPublished === true)
        .map((course) => ({
          name: course.title,
          value: course.enrolledStudents?.length || 0,
        }));

      setProgressData(progress);
      setEnrollmentData(enrollment);
    }
  }, [courses]);

  console.log(courses[0]?.price*courses[0]?.enrolledStudents?.length);
  useEffect(() => {
    if (courses.length > 0) {
      const totalEarnings = courses.reduce((acc, course) => {
        return acc + (course.price * (course.enrolledStudents?.length || 0));
      }, 0);
      setTotalEarnings(totalEarnings);
    }
  }, [courses]);

  if (courses.length === null) {
    return <div><Loader /></div>;
  }

  return (
    <div className="p-2 relative bg-[#f3f4f6] md:p-6 md:mt-12 mt-15 space-y-6">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg md:p-5 px-1.5 py-5 flex flex-col sm:flex-row md:items-center sm:items-start md:justify-between">
        <div className="flex items-center space-x-3">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt="Avatar"
              className="md:w-25 md:h-25 h-15 w-15 bg-gray-300 rounded-full object-cover"
            />
          ) : (
            <div className="md:w-25 md:h-25 h-15 w-15 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white md:text-5xl text-4xl font-bold shadow-md">
              {user.name[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold">
              <span className="text-gray-800">{user.name} 👋</span>
            </h2>
            <p className="text-gray-600">Total Earning : ₹{totalEarnings}</p>
            <p className="text-gray-500 text-sm">
              {user.discription || "Your discription"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 sm:mt-0 cursor-pointer active:bg-gray-700 px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Create Courses
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Progress */}
        <div className="bg-white shadow-lg   rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-4">
            Course Progress (Lectures)
          </h3>
          <ResponsiveContainer width="100%" height={330}>
            <BarChart className="ml-[-30px] md:ml-0" data={progressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="black" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Enrollment */}
        <div className=" bg-white shadow-lg   rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-4">Student Enrollment</h3>
          <ResponsiveContainer width="100%" height={330}>
            <BarChart className="ml-[-30px] md:ml-0" data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="black" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}
