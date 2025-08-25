import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverURL } from "../main";
import { useEffect } from "react";
import { setCoursesData } from "../redux/courseSlice";

function getAllCourses() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          `${serverURL}/api/courses/getCourses`,
          {
            withCredentials: true,
          }
        );
        dispatch(setCoursesData(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);
}

export default getAllCourses;
