import { createSlice } from "@reduxjs/toolkit";
 const  initialState={
      url:{},
      genres:{}
 }


 const homeslice=createSlice({
    name:"homeslice",
    initialState,
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url=action.payload;
        },
        getGeners:(state,action)=>{
            state.genres=action.payload;
        }
    }
    
 })


  export const {getApiConfiguration ,getGeners}=homeslice.actions;
  export default homeslice.reducer;