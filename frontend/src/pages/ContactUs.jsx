import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ContactUs() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen mt-10 bg-gray-50 flex flex-col items-center px-2 sm:px-3 lg:px-12 py-12">
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
          Contact <span className="text-blue-600">E-Shiksha</span>
        </h1>
        <p className="text-center text-gray-700 text-base sm:text-lg mb-10">
          Have questions, feedback, or need support? We’d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Contact Form */}
          <div className="bg-white rounded-md shadow-md p-3 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 mt-1 rounded-sm border border-gray-300 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-1 rounded-sm border border-gray-300 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 mt-1 rounded-sm border border-gray-300 focus:border-black outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={(e) => (e.preventDefault(), toast.success("Message sent successfully!"), navigate("/"))}
                className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-white rounded-md shadow-md p-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-6">
              You can also reach us through the following details:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>
                <span className="font-semibold">📍 Address:</span>  
                123 Learning Street, New Delhi, India
              </li>
              <li>
                <span className="font-semibold">📧 Email:</span>  
                support@eshiksha.com
              </li>
              <li>
                <span className="font-semibold">📞 Phone:</span>  
                +91 98765 43210
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
