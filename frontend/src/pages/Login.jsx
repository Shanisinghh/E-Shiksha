import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { serverURL } from "../main";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

function Login() {
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  //handle user login
  async function handlelogin(event) {
    event.preventDefault();
    console.log("User Data:", userData);
    setLoading(true);
    if (!userData.email || !userData.password) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${serverURL}/api/auth/login`,
        {
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Logged in Successfully");
      setLoading(false);
      console.log(response.data.user);
      dispatch(SetUserData(response.data.user));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      console.log(error);
    }
  }

  //handle google login
  async function googleLogin() {
    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;
      const email = user.email;
      const name = user.displayName;
      const photoUrl = user.photoURL;
      console.log(email, name, photoUrl);

      const userData = await axios.post(
        `${serverURL}/api/auth/googleauth`,
        {
          email,
          name,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Logged in Successfully");
      dispatch(SetUserData(userData));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("User Data:", userData);
  }

  return (
    <div className="flex h-[100vh]  items-center justify-center bg-gray-100">
      <div className="flex md:w-full w-[95%]  max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* left Section */}
        <div className="hidden md:flex bg-black w-1/2 flex-col items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center ">
              <img src={logo} className="w-32" alt="" />
            </div>
            <h1 className="text-4xl text-blue-700 font-bold mb-2 tracking-wide">
              E SHIKSHA
            </h1>
          </div>
        </div>
        {/* right Form Section */}
        <div className="w-full md:w-1/2 p-3">
          <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
          <p className="text-gray-400 mb-4">login your account</p>

          <form className="space-y-4" onSubmit={handlelogin}>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Your email"
                className="w-full border border-gray-300 rounded px-3 py-1 outline-none focus:border-black"
              />
            </div>
            <div className="relative">
              <label className="block font-semibold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="********"
                className="w-full border border-gray-300 rounded px-3 py-1 outline-none focus:border-black pr-10"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="2"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-1 w-full cursor-pointer bg-black text-white rounded py-2 font-semibold hover:bg-gray-800 active:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-1">
                  <ClipLoader color="white" size={22} className="pt-1" />{" "}
                  <span>Please wait...</span>{" "}
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="flex">
            <button
              onClick={() => navigate("/forgetpassword")}
              className="text-sm mt-3 cursor-pointer text-gray-400 m-auto hover:text-blue-600 active:text-blue-600"
            >
              Forget Password ?
            </button>
          </div>

          {/* Divider */}
          <div className="my-2 flex items-center">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Button */}
          <button
            onClick={googleLogin}
            className="w-full flex cursor-pointer items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200 active:bg-gray-200 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-2">
            Create a new account?{" "}
            <Link
              to="/signup"
              className="underline font-semibold text-blue-500 hover:text-blue-800 active:text-blue-800"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() =>navigate(-1)}
      />
    </div>
  );
}

export default Login;
