import React from "react";

function ReviewBox({ reviews }) {
  console.log(reviews);
  reviews?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
      {reviews?.map((review) => (
        <div
          key={review._id}
          className=" shrink-0 lg:w-[400px] w-[320px]  h-[133px] p-2 rounded-md hover:scale-102 active:scale-102 transition bg-gray-100"
        >
          <p className="text-yellow-500 text-xl">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 mb-2">
              <img src={review.user.photoUrl} alt={review.user.name} className="w-9 h-9 bg-gray-400 rounded-full" />
            </div>
            <div>
              <p className="font-semibold text-sm">{review.user.name}</p>
              <p className="text-xs text-gray-400">
                {review.user.email || "No email provided"}
              </p>
            </div>
          </div>

          <p className="text-gray-800 line-clamp-2 text-md">{review.comment}</p>
          <p className="text-xs text-gray-400">
            {review.createdAt.slice(0, 10).split("-").reverse().join("-")}
          </p>
        </div>
      ))}
    </>
  );
}

export default ReviewBox;
