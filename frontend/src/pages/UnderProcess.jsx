import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

function UnderProcess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  text-black px-1">
      {/* Icon Animation */}
      <div className="flex flex-col items-center">
        <FaSpinner className="text-6xl animate-spin mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Page Under Process 🚧
        </h1>
        <p className="text-center text-lg max-w-md">
          We're working hard to bring you this feature soon. Stay tuned!
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-2 bg-white text-blue-600 font-semibold rounded-sm border cursor-pointer shadow-md hover:bg-gray-200 transition duration-300"
      >
        Go Back Home
      </button>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default UnderProcess;
