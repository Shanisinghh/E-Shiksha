import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { useEffect } from "react";
import { useState } from "react";
import CourseBox from "./CourseBox";

// const courses = [
//   {
//     id: 1,
//     title: "Complete HTML Course",
//     category: "Web Development",
//     price: 199,
//     rating: 5,
//     image: "https://i.ibb.co/g36fQ45/html-course.png", // replace with your image
//   },
//   {
//     id: 2,
//     title: "Complete CSS Course",
//     category: "Web Development",
//     price: 199,
//     rating: 5,
//     image: "https://i.ibb.co/g97nZXQ/css-course.png", // replace with your image
//   },
// ];

function OurPopularCourses() {
  const [courses, setCourses] = useState([]);
  let [publishedCourses, setPublishedCourses] = useState([]);

  useEffect(() => {
    const publishedCoursesList = courses.filter((course) => course.isPublished);
    setPublishedCourses(publishedCoursesList);
  }, [courses]);

  if (publishedCourses.length > 0) {
    publishedCourses.sort((a, b) => {
      const avgA =
        a.reviews && a.reviews.length > 0
          ? a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length
          : 0;
      const avgB =
        b.reviews && b.reviews.length > 0
          ? b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length
          : 0;
      return avgB - avgA; // highest rated first
    });
  }

  publishedCourses = publishedCourses.slice(0, 8);

  // Fetch all courses
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getCourses`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);

  return (
    <div className="py-12 px-1 md:px-6 lg:px-1">
      <div className="md:text-center px-2 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Popular Courses
        </h2>
        <p className="text-gray-600 max-w-[100%] md:mx-auto">
          Explore top-rated courses designed to boost your skills, enhance
          careers, and unlock opportunities in tech, AI, business, and beyond.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid  sm:grid-cols-2 p-1.5 lg:grid-cols-4 gap-3">
        {publishedCourses.map((course) => (
          <CourseBox course={course} key={course._id} />
        ))}
      </div>
    </div>
  );
}

export default OurPopularCourses;
