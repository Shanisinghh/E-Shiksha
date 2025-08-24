import axios from "axios";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { MdOutlineMic } from "react-icons/md";
import { serverURL } from "../main";
import CourseBox from "../components/CourseBox";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SearchWithAI() {
  const [input, setInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

  //  Speech recognition handler
const handleSpeech = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast.error("Speech recognition not supported in this browser");
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false; // listen once
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("🎤 Listening...");
      toast.info("Listening... Speak now", { autoClose: 2000 });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);
      setInput(transcript);
        handleSearch();
    };

    recognition.onspeechend = () => {
      console.log("Speech ended");
      recognition.stop();
    };

    recognition.onend = () => {
      console.log("Recognition stopped");
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Speech recognition error: " + event.error);
    };

    recognition.start();
  } catch (err) {
    console.error("Recognition init error:", err);
    toast.error("Speech recognition failed to start");
  }
};


  // ✅ Search API call
  async function handleSearch() {
    if (!input.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.post(
        `${serverURL}/api/courses/search`,
        { input },
        { withCredentials: true }
      );
      setCourses(response.data.data || []);
      if (response.data.data.length > 0) {
        speak(" I have found some great courses for you!");
      }else{
        speak("No courses found. Please try again with different keywords.");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-[#f2f3f5] px-3">
      {/* Search Box */}
      <div className="w-full max-w-2xl bg-white gap-5 flex flex-col justify-center items-center mx-auto rounded-xl shadow-lg lg:p-6 p-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Search with <span className="text-blue-600">AI</span>
        </h1>

        <div className="flex items-center gap-3 w-full bg-amber-50 rounded-2xl shadow px-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search courses with AI..."
            className="flex-1 py-2 sm:py-3 outline-none text-black text-sm sm:text-base"
          />
          <button onClick={handleSearch}>
            <LuSearch className="text-xl sm:text-2xl text-gray-700 hover:text-blue-600 active:text-blue-600 cursor-pointer" />
          </button>
          <button onClick={handleSpeech}>
            <MdOutlineMic className="text-2xl sm:text-3xl text-gray-700 hover:text-blue-600 active:text-blue-600 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-8 w-full min-h-[50vh] mx-auto">
        <h2 className="text-center text-lg sm:text-xl font-semibold mb-6">
          AI Search Results
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Searching...</p>
        ) : searched && courses.length === 0 ? (
          <p className="text-center text-gray-400">No courses found.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseBox key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Back button */}
      <FaArrowLeft
        className="font-bold text-black  top-15 p-0.5 rounded-full fixed left-2 text-3xl active:scale-103 hover:scale-103 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default SearchWithAI;
