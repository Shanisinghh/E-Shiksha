import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { serverURL } from "../main";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const user = useSelector((state) => state.user?.user);
  console.log(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle logout
  async function handleLogout() {
    if (!user) return;
    dispatch(logout());
    const response = await axios.get(`${serverURL}/api/auth/logout`, {
      withCredentials: true,
    });
    toast.success(response?.data?.message);
    navigate("/");
    setShow2(!show2);
    setShow(false);
  }

  return (
    <nav className="shadow-xl bg-[#rgba(255,255,255,0.1] backdrop-blur-xl md:backdrop-saturate-100 md:backdrop-blur-0 px-3 md:px-10 py-1.5 z-50 fixed top-0 right-0 left-0 flex justify-between items-center">
      {/* Logo */}
      <Link to="/">
        <div className="flex justify-center items-center">
          <img
            src={logo} // replace with your logo path
            alt="Logo"
            className="md:h-12 h-11 w-auto"
          />
          <h1 className=" text-xl  tracking-tight md:mb-0.5 mt-1 md:mt-0  font-bold text-[#106ce1]">
            E SHIKSHA
          </h1>
        </div>
      </Link>

      {/* Right side */}
      <div className="hidden md:flex items-center space-x-3">
        {/* Avatar */}
        {/* No user logged in */}
        {!user ? (
          <FaUserCircle className="w-10 cursor-pointer h-10 text-blue-600" />
        ) : user.photoUrl === "" ? (
          // No photo, show initial
          <div
            onClick={() => setShow(!show)}
            className="flex cursor-pointer border border-white items-center justify-center w-10 h-10 rounded-full bg-black text-white font-bold text-lg"
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          // Photo available
          <img
            onClick={() => setShow(!show)}
            src={user.photoUrl}
            alt="User"
            className="w-10 cursor-pointer  h-10 bg-gray-400 rounded-full object-cover"
          />
        )}

        {/* Dashboard Button */}
        {user?.role === "Educator" && (
          <button onClick={() => navigate("/dashboard")} className="px-4 py-1.5 border border-black rounded-sm text-black cursor-pointer hover:bg-[#e9dbdb] active:bg-[#e9dbdb] bg-white hover:text-black transition">
            Dashboard
          </button>
        )}

        {/* Logout Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-black border border-[red] text-[red] rounded-sm hover:bg-gray-700 active:bg-gray-700   cursor-pointer transition"
          >
            Logout
          </button>
        ) : (
          // Login Button
          <Link
            to="/login"
            className="px-4 py-1.5 border border-white bg-black text-white rounded-sm hover:bg-gray-700 active:bg-gray-700 cursor-pointer transition"
          >
            Login
          </Link>
        )}
      </div>
      {/* Mobile Menu button */}
      <div className="md:hidden">
        {!show2 ? (
          <FiMenu
            onClick={() => setShow2(!show2)}
            className="md:hidden text-3xl bg-[#ffffff] rounded-sm p-0.5  cursor-pointer"
          />
        ) : (
          <RxCross2
            onClick={() => setShow2(!show2)}
            className="md:hidden text-3xl bg-[#ffffff] rounded-sm p-0.5  cursor-pointer"
          />
        )}
      </div>

      {/* Mobile Menu slider */}
      <div
        className={`md:hidden absolute top-14 right-47 z-10 rounded-sm shadow-2xl w-[100%] h-73 flex gap-2 flex-col items-center transition-all overflow-hidden ease-in-out duration-500 bg-black text-white p-2 ${
          show2 ? " left-0" : " left-[-200%]"
        }`}
      >
        {!user ? (
          <FaUserCircle className="w-10 mt-3 cursor-pointer h-10 text-white" />
        ) : user.photoUrl === "" ? (
          // No photo, show initial
          <div className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold text-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          // Photo available
          <img
            src={user.photoUrl}
            alt="User"
            className="w-10 cursor-pointer border h-10 bg-gray-400 rounded-full object-cover"
          />
        )}

        {/* Dashboard Button */}
        {user?.role === "Educator" && (
          <button
            onClick={() => {  navigate("/dashboard"); setShow2(!show2); }}
            className="px-4 py-0.5 border border-white rounded-sm text-white cursor-pointer hover:bg-white active:bg-white w-[200px] text-center hover:text-black transition"
          >
            Dashboard
          </button>
        )}

        {/* Logout Button */}

        <div
          onClick={() => {
            setShow2(!show2);
            if (user) {
              navigate("/profile");
            } else {
              navigate("/login");
            }
          }}
          className="cursor-pointer w-[200px] text-center px-6 hover:bg-gray-700 active:bg-gray-700 py-0.5 border rounded-sm"
        >
          Profile
        </div>
        <div
          onClick={() => {
            setShow2(!show2);
            if (user) {
              navigate("/mycourses");
            } else {
              navigate("/login");
            }
          }}
          className="cursor-pointer w-[200px] text-center px-6 hover:bg-gray-700 active:bg-gray-700 py-0.5 border rounded-sm"
        >
          My Courses
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 w-[200px]  py-0.5 bg-black border border-[red] text-red-600 rounded-sm hover:bg-gray-700 active:bg-gray-700 cursor-pointer transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button
              onClick={() => setShow2(!show2)}
              className="px-4 w-[200px] py-0.5 border border-white bg-black text-white rounded-sm hover:bg-gray-700 active:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </Link>
        )}
      </div>

      <div
        className={`absolute top-15 right-47 z-10 rounded-sm shadow-2xl w-45 h-23 flex gap-2 flex-col items-center transition-all overflow-hidden ease-in-out duration-200 bg-black text-white p-2 ${
          show ? " translate-x-0" : " translate-y-[-500%]"
        }`}
      >
        <div
          onClick={() => {
            setShow(!show);
            if (user) {
              navigate("/profile");
            } else {
              navigate("/login");
            }
          }}
          className="cursor-pointer px-6 hover:bg-gray-700 active:bg-gray-700 py-0.5 border rounded-sm"
        >
          Profile
        </div>
        <div
          onClick={() => {
            setShow(!show);
            if (user) {
              navigate("/mycourses");
            } else {
              navigate("/login");
            }
          }}
          className="cursor-pointer px-6 hover:bg-gray-700 active:bg-gray-700 py-0.5 border rounded-sm"
        >
          My Courses
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
