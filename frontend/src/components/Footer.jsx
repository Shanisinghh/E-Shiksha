import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-3 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* Brand */}
        <div>
          <img src={logo} className="w-20" alt="" />
          <h2 className="text-2xl font-bold text-white">E-Shiksha</h2>
          <p className="mt-3 text-sm text-gray-400">
            Empowering education through technology. Learn anytime, anywhere
            with our interactive courses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white hover:underline active:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allcourses"
                className="hover:text-white hover:underline active:underline"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="hover:text-white hover:underline active:underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className="hover:text-white hover:underline active:underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-md font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/faq"
                className="hover:text-white hover:underline active:underline"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/privacypolicy"
                className="hover:text-white hover:underline active:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/termsandconditions"
                className="hover:text-white hover:underline active:underline"
              >
                Terms & Conditions
              </Link>
            </li>
             <li>
              <Link
                to="/refundpolicy"
                className="hover:text-white hover:underline active:underline"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              to="#"
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-110 transition transform duration-300 text-white"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 hover:scale-110 transition transform duration-300 text-white"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 hover:scale-110 transition transform duration-300 text-white"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 hover:scale-110 transition transform duration-300 text-white"
            >
              <FaInstagram />
            </Link>
          </div>

          <div className="flex">
            <input
              type="email"
              className="w-full p-2 mt-4 rounded-l-md text-sm bg-gray-700 text-white outline-none"
              placeholder="Enter your email"
            />
            <button className="p-2 text-sm text-black cursor-pointer mt-4 rounded-r-md bg-blue-600 hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-3 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} E-Shiksha. All Rights Reserved.
      </div>
    </footer>
  );
}
