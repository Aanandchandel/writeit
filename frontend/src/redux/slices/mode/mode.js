import { createSlice } from "@reduxjs/toolkit";

export const modeSlice=createSlice({
    initialState:"light",
    name :"mode",
    reducers:{
        light:(state,action)=> "light",
        dark:(state)=> "dark"
    }
})
export const { light,dark}=modeSlice.actions
export default modeSlice.reducer;