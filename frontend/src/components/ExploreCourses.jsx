// ExploreCourses.jsx
import {
  FaLaptopCode,
  FaMobileAlt,
  FaBrain,
  FaChartBar,
  FaTools,
  FaUserSecret,
} from "react-icons/fa";
import { SiAdobexd } from "react-icons/si";
import { PiGraphDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Web Development",
    icon: <FaLaptopCode size={32} />,
    color: "bg-pink-200",
  },
  {
    id: 2,
    title: "UI UX Designing",
    icon: <SiAdobexd size={32} />,
    color: "bg-green-200",
  },
  {
    id: 3,
    title: "App Development",
    icon: <FaMobileAlt size={32} />,
    color: "bg-red-200",
  },
  {
    id: 4,
    title: "Ethical Hacking",
    icon: <FaUserSecret size={32} />,
    color: "bg-purple-200",
  }, // <-- fixed
  { id: 5, title: "AI/ML", icon: <FaBrain size={32} />, color: "bg-green-200" },
  {
    id: 6,
    title: "Data Science",
    icon: <PiGraphDuotone size={32} />,
    color: "bg-pink-200",
  },
  {
    id: 7,
    title: "Data Analytics",
    icon: <FaChartBar size={32} />,
    color: "bg-purple-200",
  },
  {
    id: 8,
    title: "AI Tools",
    icon: <FaTools size={32} />,
    color: "bg-green-200",
  },
];

export default function CoursesSection() {

  const navigate = useNavigate();
  return (
    <section className="py-5 px-3 md:px-5 flex flex-col md:flex-row items-start justify-between gap-10">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold mb-2">Explore</h2>
        <h2 className="text-3xl font-bold mb-4">Our Courses</h2>
        <p className="text-gray-600 mb-6">
          Learning made simple, flexible, and effective. Choose from thousands
          of expert-led courses. Invest in yourself — because your future
          matters.
        </p>
        <button onClick={() => navigate("/allcourses")} className="flex cursor-pointer items-center gap-2 bg-black text-white px-5 py-2 rounded-sm font-medium hover:bg-gray-700 active:bg-gray-700 transition">
          Explore Courses <span className="text-lg">➜</span>
        </button>
      </div>

      <div className="grid grid-cols-2 m-auto sm:grid-cols-3 gap-3 flex-1">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`flex flex-col items-center justify-center p-6 rounded-sm shadow-sm active:scale-105 hover:shadow-md hover:scale-105 transition ${course.color}`}
          >
            {course.icon}
            <p className="mt-3 font-medium text-gray-800">{course.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
