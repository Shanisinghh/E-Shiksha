import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen mt-10 bg-gray-50 flex flex-col items-center px-2 sm:px-6 lg:px-12 py-12">
      <div className="max-w-5xl w-full text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About <span className="text-blue-600">E-Shiksha</span>
        </h1>

        {/* Introduction */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 px-2 sm:px-8">
          At <span className="font-semibold">E-Shiksha</span>, we believe that
          quality education should be accessible to everyone, anywhere. Our
          platform empowers learners to explore, practice, and master skills in
          technology, design, data, and more — guided by expert instructors and
          hands-on projects.
        </p>

        {/* Mission Section */}
        <div className="bg-white rounded-md shadow-md p-3 sm:p-8 mb-3 text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Our mission is to bridge the gap between traditional learning and
            modern industry needs. We aim to provide practical, affordable, and
            engaging courses that prepare learners for real-world challenges and
            career opportunities.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          <div className="bg-white rounded-md shadow-md p-3">
            <h3 className="font-semibold text-xl text-blue-600 mb-2">
              Innovation
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              We embrace new tools and methods to make learning more interactive
              and effective.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md p-3">
            <h3 className="font-semibold text-xl text-blue-600 mb-2">
              Accessibility
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Courses designed to be affordable and available anytime, anywhere.
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md p-3">
            <h3 className="font-semibold text-xl text-blue-600 mb-2">Growth</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Helping learners gain knowledge and confidence to excel in their
              careers.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <p className="text-gray-700 text-base sm:text-lg md:text-xl px-4 sm:px-16">
          Whether you’re starting your journey or leveling up your skills,{" "}
          <span className="font-semibold">E-Shiksha</span> is here to support
          your learning every step of the way.
        </p>
      </div>
    </div>
  );
}
