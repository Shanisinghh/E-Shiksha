import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import abouthero from "../assets/abouthero.png";

export default function AboutUsHero() {
  return (
    <div className=" bg-white flex flex-col lg:flex-row  items-center justify-center gap-10 px-3 py-5 ">
      {/* Left Side: Image + Video */}
      <div className="relative w-full lg:w-[45vw] h-[70vh] flex justify-center">
        <img
          src={abouthero}
          alt="About Us"
          className="rounded-xl h-full shadow-lg object-cover object-top w-full "
        />

      </div>

      {/* Right Side: Content */}
      <div className="w-full  lg:w-[40vw]">
        <p className="text-gray-500 font-medium mb-2">About Us</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-snug">
          We Are Maximize Your <br /> Learning Growth
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
          We provide a modern Learning Management System to simplify online
          education, track progress, and enhance student-instructor collaboration
          efficiently.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            <span className="text-gray-800 font-medium">Simplified Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            <span className="text-gray-800 font-medium">Expert Trainers</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            <span className="text-gray-800 font-medium">Big Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            <span className="text-gray-800 font-medium">Lifetime Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
