import React, { useEffect, useState } from "react";
import { serverURL } from "../main";
import axios from "axios";
import { RiLock2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CourseBox from "../components/CourseBox";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LiaHandPointRight } from "react-icons/lia";
import { FaPlay, FaPause } from "react-icons/fa";
import Loader from "../components/Loader";
import ReviewBox from "../components/ReviewBox";
import { getCurrentUser } from "../costumHools/getCurrentUser";

function ViewCourse() {
  const user = useSelector((state) => state.user?.user);
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [creatorCourses, setCreatorCourses] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [rating, setRating] = useState(0); // stores selected rating
  const [hoverRating, setHoverRating] = useState(0); // stores hover rating
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  let averageRating = course.reviews?.length
    ? course.reviews.reduce((acc, review) => acc + review.rating, 0) /
      course.reviews.length
    : 0;
  course.reviews?.length ? (averageRating = averageRating.toFixed(1)) : 0;

  // fetch course by ID
  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getcoursebyid/${courseId}`
        );
        setCourse(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourse();
  }, [courseId, dataLoading]);

  // fetch creator courses only after course.creator._id exists
  useEffect(() => {
    async function fetchCreatorCourses() {
      if (!course?.creator?._id) return; // wait until creator is available
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getcoursesbycreator/${course.creator._id}`
        );
        // filter only published courses here
        const published = response.data.filter((c) => c.isPublished === true);
        setCreatorCourses(published);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCreatorCourses();
  }, [course?.creator?._id]);

  async function handleEnrollment(courseId, userId) {
    console.log(userId, courseId);
    try {
      const orderData = await axios.post(
        `${serverURL}/api/order/razorpay-order`,
        { userId, courseId },
        { withCredentials: true }
      );
      console.log(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.order.amount,
        currency: "INR",
        name: "E SHIKSHA",
        description: "Course Purchase",
        order_id: orderData.data.order.id,
        handler: async function (response) {
          console.log(response);
          try {
            const verifyRes = await axios.post(
              `${serverURL}/api/order/payment-verification`,
              {
                razorpay_order_id: response.razorpay_order_id,
                userId,
                courseId,
              },
              { withCredentials: true }
            );
            console.log(verifyRes);
            if (verifyRes.data.message === "Payment successful") {
              toast.success("Payment successful");
              setDataLoading(true);
            }
          } catch (err) {
            console.log(err);
          }
        },
      };

      if (user) {
        if (!course?.enrolledStudents?.includes(user?._id)) {
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          toast.error("You are already enrolled in this course");
          return;
        }
      } else {
        toast.error("Please log in to enroll in this course");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //for review submission
  async function handleReviewSubmit(courseId) {
    try {
      if (rating === 0 || comment.trim() === "") {
        toast.error("Please provide a rating and comment");
        return;
      }
      const response = await axios.post(
        `${serverURL}/api/courses/createreview`,
        {
          rating,
          comment,
          courseId,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      setDataLoading(!dataLoading);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to submit review");
    }
  }

  if (!course) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="px-2 mt-12 lg:px-5 py-6 bg-[#f0f1f3]">
      {/* -------- Course Header Section -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 py-2 gap-6 items-center">
        <img
          src={course?.thumbnail}
          alt="Course Banner"
          className="rounded-lg lg:h-[60vh] lg:w-[45vw] shadow-sm"
        />

        <div>
          <h2 className="text-2xl font-bold mb-1">{course?.title}</h2>
          <p className="text-gray-600 ">
            Learn {course?.category?.toUpperCase()}
          </p>
          <p className="text-gray-600 my-1">{course?.description}</p>
          <p className=" mb-2">
            {averageRating}⭐
              ({course?.reviews?.length} reviews)
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-black">
              ₹{course?.price}
            </span>
            <span className="line-through text-gray-500">
              {course?.price + 150}
            </span>
          </div>
          <ul className="text-sm text-gray-600 mb-1 space-y-1">
            <li>✅ 10+ hours of structured video content</li>
            <li>✅ Lifetime access to all course materials</li>
            <li>✅ Step-by-step guidance with real projects</li>
          </ul>
          <p className="text-gray-600 text-md mb-2">
            👉 Enroll today and transform your career with {course?.category}!
          </p>
          {course?.enrolledStudents?.includes(user?._id) ? (
            <button
              onClick={() => navigate(`/viewlecture/${courseId}`)}
              className="bg-green-500 text-white px-20 py-1.5 rounded-sm cursor-pointer hover:bg-green-700 active:bg-green-700 transition"
            >
              <LiaHandPointRight className="inline-block pr-1.5 text-3xl" />
              Watch Now
            </button>
          ) : (
            <button
              onClick={() => handleEnrollment(course?._id, user?._id)}
              className="bg-black text-white px-20 py-2 rounded-sm cursor-pointer hover:bg-gray-800 active:bg-gray-800 transition"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>

      {/* -------- What You’ll Learn & Requirements -------- */}
      <div>
        <h3 className="font-semibold text-lg mb-2">What You'll Learn</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Learn {course?.category} from Beginning to Advanced.</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Requirements.</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li> Basic programming knowledge is helpful, but not mandatory.</li>
          <li> A computer with internet access and eagerness to learn.</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Who This Course is For</h3>
        <p className="text-gray-600">
          Beginners, aspiring developers, and professionals looking to upgrade
          skills.
        </p>
      </div>

      {/* -------- Curriculum + Preview Video -------- */}
      <div className="grid grid-cols-1 mt-2 lg:grid-cols-2 gap-3 py-3">
        {/* Curriculum */}
        <div className="bg-white p-4 rounded-lg shadow-md  ">
          <h3 className="font-semibold text-xl mb-2">Course Curriculum</h3>
          <p className="text-sm text-gray-500 mb-3">
            {course?.lectures?.length || 0} Lectures
          </p>

          {course?.lectures?.length === 0 ? (
            <div className="flex lg:mt-[20%] mt-[10%] justify-center h-full text-gray-500">
              No lectures available
            </div>
          ) : (
            <div className="max-h-[52vh] scrollbar-hide overflow-y-scroll">
              {course?.lectures?.map((lecture) =>
                lecture?.isPreviewFree ? (
                  <div
                    key={lecture._id}
                    className="flex items-center gap-2 my-1 p-2 border rounded-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    <span className="text-black">
                      {selectedLecture?._id === lecture._id ? (
                        <FaPause className="text-gray-600 text-sm" />
                      ) : (
                        <FaPlay className="text-gray-600 text-sm" />
                      )}
                    </span>
                    <span>{lecture.title}</span>
                  </div>
                ) : (
                  <div
                    key={lecture._id}
                    className="flex items-center gap-2 my-1 bg-gray-300 p-2 border rounded-sm  hover:bg-gray-100"
                    style={{ pointerEvents: "none" }}
                  >
                    <span className="text-black text-[18px]">
                      <RiLock2Line />
                    </span>
                    <span>{lecture.title}</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="bg-white lg:p-4  rounded-lg shadow-md">
          <div className="w-full h-[32vh]  lg:h-86 bg-black flex items-center justify-center text-white text-sm rounded-md">
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl || undefined}
                controls
                className="w-full h-full rounded-sm object-cover"
              />
            ) : selectedLecture ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Video not available
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a preview lecture to watch
              </div>
            )}
          </div>
          <div className="p-2">
            <h4 className="font-semibold text-xl mt-2">
              {selectedLecture?.title || "Course Title"}
            </h4>
            <p className="text-sm text-gray-600">
              {selectedLecture?.description || "Course Description"}
            </p>
          </div>
        </div>
      </div>

      {/* -------- Review Section -------- */}
      <div className="bg-white lg:p-4 p-2 mb-3 rounded-lg shadow-md">
        <h3 className="font-semibold mb-2">Write a Review</h3>

        {/* Star Rating */}
        <div className="flex gap-1 mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={`text-xl cursor-pointer transition ${
                  (hoverRating || rating) > i
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <span className="lg:text-2xl text-2xl">★</span>
              </span>
            ))}
        </div>

        {/* Comment Box */}
        <input
          type="text"
          placeholder="Write your comment here..."
          className="lg:w-[85%] w-full border border-gray-300 focus:border-black inline-block rounded-sm lg:rounded-r-none outline-none  p-2 mb-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className="bg-black cursor-pointer text-white px-7 py-2 rounded-sm lg:rounded-l-none border border-black hover:bg-gray-800 transition"
          onClick={() => handleReviewSubmit(courseId)}
        >
          Submit Review
        </button>
        {/* Review List */}
        <div className="space-y-3 flex gap-3 px-2  w-full overflow-y-scroll scrollbar-hide mt-3">
          <ReviewBox reviews={course?.reviews} />
        </div>
      </div>
      {/* -------- Educator Info -------- */}
      <div className="bg-white lg:p-2 rounded-lg shadow-md">
        <div className="flex p-2 items-center gap-3 mb-3">
          <img
            src={course?.creator?.photoUrl}
            alt="Educator"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{course?.creator?.name}</h4>
            <p className="text-sm text-gray-500">
              {course?.creator?.discription}
            </p>
          </div>
        </div>
        <h3 className="font-semibold text-lg p-2">
          Other Published Courses by the {course?.creator?.name}
        </h3>

        {/* Other Courses Grid */}
        <div className="grid p-1 grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {creatorCourses.map((course) => (
            <CourseBox key={course._id} course={course} />
          ))}
        </div>
      </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate("/allcourses")}
      />
    </div>
  );
}

export default ViewCourse;
