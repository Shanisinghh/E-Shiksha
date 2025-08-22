import React, { use, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { serverURL } from "../main";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleEmailSubmit(e) {
    e.preventDefault();
    console.log(email);
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverURL}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      setStep(2);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(otp);
    try {
      const response = await axios.post(
        `${serverURL}/api/auth/verifyotp`,
        { email, otp },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response?.data?.message);
      setStep(3);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }
  async function handlPasswordeSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }
    console.log("New Password:", password);
    try {
      const response = await axios.post(
        `${serverURL}/api/auth/resetpassword`,
        { email, password },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center  h-[90vh] bg-gray-100">
      {step === 1 && (
        <div className="bg-white shadow-lg rounded-xl p-3 md:w-full w-[95%] max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Forget your Password
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter a registered email below to reset your password.
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {/*  */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your Email address
              </label>
              <input
                type="email"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black  text-white py-2 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-gray-700 transition"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-1">
                  <ClipLoader color="white" size={22} className="pt-1" />{" "}
                  <span>Please wait...</span>{" "}
                </span>
              ) : (
                " Send OTP"
              )}
            </button>
          </form>

          <p className="text-center mt-2 font-semibold text-sm text-gray-600">
            <span
              onClick={() => navigate("/login")}
              className="underline hover:text-blue-600 active:text-blue-800 cursor-pointer"
            >
              Back to Login
            </span>
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white shadow-lg rounded-xl p-3 md:w-full w-[95%] max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Enter OTP
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter OTP to reset your password.
          </p>

          <form onSubmit={handleOtpSubmit} className="space-y-4">
            {/*  */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-gray-700 transition"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-1">
                  <ClipLoader color="white" size={22} className="pt-1" />{" "}
                  <span>Please wait...</span>{" "}
                </span>
              ) : (
                " Verify OTP"
              )}
            </button>
          </form>

          <p className="text-center mt-2 font-semibold text-sm text-gray-600">
            <span
              onClick={() => navigate("/login")}
              className="underline hover:text-blue-600 active:text-blue-600 cursor-pointer"
            >
              Back to Login
            </span>
          </p>
        </div>
      )}
      {step === 3 && (
        <div className="bg-white shadow-lg rounded-xl p-3 md:w-full w-[95%] max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Reset Your Password
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter a new password below to regain access to your account.
          </p>

          <form onSubmit={handlPasswordeSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-gray-800 transition"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-1">
                  <ClipLoader color="white" size={22} className="pt-1" />{" "}
                  <span>Please wait...</span>{" "}
                </span>
              ) : (
                " Reset Password"
              )}
            </button>
          </form>

          <p className="text-center mt-2 font-semibold text-sm text-gray-600">
            <span
              onClick={() => navigate("/login")}
              className="underline hover:text-blue-600 active:text-blue-600 cursor-pointer"
            >
              Back to Login
            </span>
          </p>
        </div>
      )}
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default ForgetPassword;
