import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function CourseBox({ course }) {
  // console.log(course.reviews);
  let averageRating = course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length || 0;
  // console.log(averageRating);
   course.reviews?.length ? (averageRating = averageRating.toFixed(1)) : 0;

  return (
    <>
     <Link to={`/viewcourse/${course._id}`}>
       <div
        key={course._id}
        className="bg-white flex flex-col shadow-md  rounded-md overflow-hidden hover:scale-102 transition w-full lg:w-auto"
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full shrink-0 h-45 object-cover"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-gray-500 text-sm">{course.category}</p>
          <div className="flex justify-between items-center mt-1">
            <span className="font-bold">₹{course.price}</span>
            <div className="flex items-center text-yellow-500">
              <span className="mr-1 text-black">{averageRating}</span>
              <FaStar className="mr-1" /> 
            </div>
          </div>
        </div>
      </div>
     </Link>
    </>
  );
}

export default CourseBox;
