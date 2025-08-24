import React from "react";
import { getCurrentUser } from "../costumHools/getCurrentUser";
import hero from "../assets/hero.png";
import homeobj1 from "../assets/homeobj1.png";
import { LuSearch } from "react-icons/lu";
import FeatureCards from "../components/FeatureCards";
import ExploreCourses from "../components/ExploreCourses";
import OurPopularCourses from "../components/OurPopularCources";
import { useNavigate } from "react-router-dom";
import AboutUsHero from "../components/AboutUsHero";
import Reviews from "../components/reviews";

function Home() {
  getCurrentUser();
  const navigate = useNavigate();

  return (
<div>
      <div
      className="flex flex-col-reverse md:flex-row w-full min-h-[93vh] md:min-h-screen relative"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Left Section */}
      <div className="relative flex flex-col justify-center px-1 md:px-10 pb-[17%] md:py-12 w-full md:w-[65%] text-center md:text-left">
        <h1 className="text-[34px] sm:text-3xl text-white md:text-[62px] leading-tight  font-[600]">
          Learn, Grow, Succeed with E-Shiksha
        </h1>
        <p className="text-[16px] sm:text-lg text-white mt-2">Access quality courses anytime, anywhere, and build a brighter tomorrow with E-Shiksha.</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:justify-center md:justify-start">
          <button onClick={() => navigate("/allcourses")} className="text-white px-6 cursor-pointer py-2 border border-white rounded-sm hover:bg-[#292727] active:bg-[#292727] transition">
            View all courses
          </button>
          <button onClick={()=>navigate("/search")} className="text-black px-6 cursor-pointer py-2 flex items-center justify-center gap-2 rounded-sm border bg-white border-white hover:bg-[#f1e7e7] active:bg-[#ece2e2] transition">
            Search with AI <LuSearch className="text-lg" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex justify-center items-center w-full md:w-[35%] px-4 md:px-0 mb-6 md:mb-0">
        <img
          src={homeobj1}
          className="w-[70%] sm:w-[60%] md:w-[80%] lg:w-[90%] h-auto object-contain"
          alt="hero illustration"
        />
      </div>
    </div>
    <FeatureCards />
    <ExploreCourses />
    <OurPopularCourses />
    <AboutUsHero />
    <Reviews />
</div>
  );
}

export default Home;
