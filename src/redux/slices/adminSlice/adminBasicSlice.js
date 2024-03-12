import { createSlice } from "@reduxjs/toolkit";
import { adminBasicDetails } from "./adminBasicAction";





const adminBasicSlice = createSlice({
  name: "admindata",
  initialState:[],
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(adminBasicDetails.pending,(state, { payload })=>{
      state.loading = true
      
    })
    .addCase(adminBasicDetails.fulfilled,(state, { payload })=>{
      state.loading = false
      state.adinAddData = payload
      
    })
    .addCase(adminBasicDetails.rejected,(state, { payload })=>{
      state.loading = false
      state.getError = payload
    })
  }
});


export default adminBasicSlice.reducer;
