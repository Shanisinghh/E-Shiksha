import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import CourseBox from "../components/CourseBox";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import getAllCourses from "../costumHools/getAllCourses";

// Category List
const categories = [
  "FullStack Development",
  "Frontend Development",
  "Backend Development",
  "App Development",
  "AI/ML",
  "AI Tools",
  "Data Science",
  "Data Analytics",
  "UI UX Designing",
  "Ethical Hacking",
];
const price = ["Low to high", "High to low", "Top Rated"];

function AllCourses() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  const navigate = useNavigate();
  getAllCourses();

  const courses = useSelector((state) => state.course.coursesData);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const publishedCoursesList = courses?.filter((course) => course.isPublished);
    setCoursesData(publishedCoursesList);
  }, [courses]);



  // Toggle category selection (multi-select)
  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle price selection
  const handlePriceChange = (selectedPriceOrder) => {
    setSelectedPrice(selectedPriceOrder);
  };

  // Final filter logic (search + category + price sorting)
  let filteredCourses = coursesData.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(course.category))
  );

  if (selectedPrice) {
    filteredCourses = [...filteredCourses];
    if (selectedPrice === "Low to high") {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "High to low") {
      filteredCourses.sort((a, b) => b.price - a.price);
    } else if (selectedPrice === "Top Rated") {
      filteredCourses.sort((a, b) => {
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
  }



  return (
    <>
      {/* price filter button */}
      <div>
        <h2
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="fixed top-17 z-20 right-2 hidden lg:flex px-2 py-2 cursor-pointer bg-black active:bg-gray-800 w-[10%] justify-center rounded-sm text-white text-center text-sm flex items-center gap-1  mb-2"
        >
          <FiFilter className=" text-blue-600 text-xl" />{" "}
          <span>Filter by Price</span>
        </h2>
      </div>

      <div className="flex relative mt-14 flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div
          className={` lg:static absolute  md:w-[35%] lg:w-[25%] w-[70%] min-h-screen  bg-black text-white transition-all duration-300 px-6 py-2 ${
            showFilter ? "left-0" : "left-[-100%]"
          }`}
        >
          <h3 className="text-lg flex justify-between items-center font-semibold mb-4">
            <span>Filter by Category</span>{" "}
            <RxCross2
              onClick={() => setShowFilter(!showFilter)}
              className=" text-white lg:hidden text-2xl cursor-pointer"
            />
          </h3>

          {/* Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 pl-10 rounded-sm bg-transparent border border-gray-500 focus:border-blue-600 text-white 
               placeholder-gray-400 outline-none  
                transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-2 bottom-3 text-xl transform  text-blue-600 group-hover:text-indigo-400 transition-colors duration-300" />
          </div>

          {/* Multi-Select Category List */}
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer text-sm my-1.5 px-3 py-2 rounded-sm ${
                  selectedCategories.includes(category)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>

          {/* Clear Filters Button */}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => {
                setSelectedCategories([]);
                setShowFilter(!showFilter);
              }}
              className="mt-2 w-full cursor-pointer bg-red-600 hover:bg-red-700 text-sm text-white py-2 rounded-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Course Grid */}
        <div className="flex-1 py-2 px-1">
          {/* Filter Buttons */}
          <div className="flex lg:hidden w-[100%] justify-center gap-2">
            <h2
              onClick={() => setShowFilter(!showFilter)}
              className=" px-2 py-2 cursor-pointer bg-black active:bg-gray-800 w-[50%] justify-center rounded-sm text-white text-center text-sm flex items-center gap-1  mb-2"
            >
              <FiFilter className=" text-blue-600 text-xl" />{" "}
              <span>Filter by Category</span>
            </h2>
            <h2
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className=" px-2 py-2 cursor-pointer bg-black active:bg-gray-800 w-[50%] justify-center rounded-sm text-white text-center text-sm flex items-center gap-1  mb-2"
            >
              <FiFilter className=" text-blue-600 text-xl" />{" "}
              <span>Filter by Price</span>
            </h2>
          </div>

          <div className="grid max-h-[100vh] overflow-y-scroll scrollbar-hide sm:grid-cols-2 p-1.5 lg:grid-cols-3 gap-3">
            {filteredCourses.map((course) => (
              <CourseBox key={course._id} course={course} />
            ))}
          </div>

          {/* No results */}
          {filteredCourses.length === 0 && (
            <p className="text-center text-2xl text-gray-500 mt-10">
              No courses match your filter.
            </p>
          )}
        </div>

        {/* Price Filter Container */}
        <div
          className={`md:w-[35%] lg:w-[25%]  w-[70%] min-h-screen px-4 absolute right-0 rounded-sm h-[35vh] md:h-full bg-black flex flex-col transition-all duration-300 gap-1.5 p-2 ${
            showPriceFilter ? "left-0" : "left-[-100%]"
          }`}
        >
          <h3 className="text-lg flex justify-between items-center font-semibold mb-4">
            <span className="text-white">Filter by Price and Rating</span>{" "}
            <RxCross2
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className=" text-white  text-2xl cursor-pointer"
            />
          </h3>
          {price.map((priceFilter, index) => (
            <div
              key={index}
              onClick={() => {
                handlePriceChange(priceFilter);
                setShowPriceFilter(!showPriceFilter);
              }}
              className={`cursor-pointer px-2 py-2 text-white text-sm rounded-sm ${
                selectedPrice === priceFilter
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {priceFilter}
            </div>
          ))}

          {selectedPrice && (
            <button
              onClick={() => {
                setSelectedPrice("");
                setShowPriceFilter(!showPriceFilter);
              }}
              className="mt-2 w-full cursor-pointer bg-red-600 hover:bg-red-700 text-sm text-white py-2 rounded-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCourses;
