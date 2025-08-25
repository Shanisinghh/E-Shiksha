import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { useEffect } from "react";
import { useState } from "react";
import CourseBox from "./CourseBox";
import { useSelector } from "react-redux";
import getAllCourses from "../costumHools/getAllCourses";



function OurPopularCourses() {
  const courses = useSelector((state) => state.course.coursesData);
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
