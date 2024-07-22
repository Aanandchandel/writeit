import { createSlice } from "@reduxjs/toolkit";

export const renderSlice = createSlice({
    name: "renderslice",
    initialState: { sidebar: false, namea: "jack" }, // Added comma for clarity
    reducers: {
        toggleSidebar: (state, action) => {
            return { ...state, sidebar: !state.sidebar }; // Updated to correctly toggle sidebar
        }
    }
});

export const { toggleSidebar } = renderSlice.actions;
export default renderSlice.reducer;
