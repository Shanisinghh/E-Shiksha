import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "courses",
    initialState: {
        coursesData: [],
    },
    reducers: {
        setCoursesData: (state, action) => {
            state.coursesData = action.payload;
        },
    },
});

export const { setCoursesData } = courseSlice.actions;
export default courseSlice.reducer;

