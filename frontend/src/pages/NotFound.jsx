import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-sm bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
      >
        Go to Home
      </Link>
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}
