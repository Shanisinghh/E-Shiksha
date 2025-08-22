import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Shani Singh",
    role: "Fullstack Developer (MERN Stack)",
    review:
      "E-Shiksha made learning so easy and fun. The courses are well-structured, and I love how I can track my progress anytime.",
    rating: 5,
    img: "https://shani-portfolio-0114.netlify.app/assets/photo-KpBThcv1.png",
  },
  {
    id: 2,
    name: "Favour Okeke ",
    role: "Fullstack Learner",
    review:
      "Great platform for beginners and professionals alike. The quizzes and assignments really helped me test my knowledge.",
    rating: 4,
    img: "https://media.licdn.com/dms/image/v2/D5603AQFogMX5iqf2Ew/profile-displayphoto-scale_200_200/B56ZiQKHcGHkAc-/0/1754765228236?e=1758758400&v=beta&t=d5gol7JSQg5XIXONT4_48lhIpZS-43Vh_n0s0_Jqs1c",
  },
  {
    id: 3,
    name: "Sneha Gupta",
    role: "Designer",
    review:
      "The lifetime access feature is amazing. I revisit modules before client projects, and the content always feels fresh and relevant.",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/D4D03AQEuY_cCRvm0pg/profile-displayphoto-shrink_100_100/B4DZdVV11sGgAU-/0/1749483479008?e=1758758400&v=beta&t=uS4_-vcsBL1QosZ6AxevJq5yF1syv1QLl7z2t_GTLG8",
  },
    {
    id: 4,
    name: "Rohit Verma",
    role: "Frontend Developer",
    review:
      "The expert trainers explain concepts in a simple, practical way. I learned React and applied it directly to my job within weeks.",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/D4D03AQGCLPfEvLI7lQ/profile-displayphoto-shrink_100_100/B4DZRCRruiHwAU-/0/1736278721400?e=1758758400&v=beta&t=TD2jAkpeEYlvPGb5oe8jkKRHj1ArWDbYTUBb5QE59OQ",
  },
];

export default function Reviews() {
  return (
    <div className=" px-3 py-10">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          What Our Students Say
        </h2>
        <p className="text-gray-600 mt-2">
          Thousands of learners are growing with E-Shiksha. Here are some of
          their experiences.
        </p>
      </div>

      {/* Review Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4  ">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-100 p-5 rounded-md  hover:scale-102 active:scale-102 transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.img}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-900">
                  {review.name}
                </h4>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-left">“{review.review}”</p>
            <div className="flex text-yellow-400">
              {Array(review.rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
