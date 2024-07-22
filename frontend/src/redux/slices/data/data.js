import { createSlice } from "@reduxjs/toolkit";

export const dataSlice=createSlice({
    initialState:["aananad",],
    name:"data",
    reducers:{
        setData:(state,action)=>{
            return [  action.payload,...state]
        }

    }
})
export const { setData }=dataSlice.actions
export default dataSlice.reducer