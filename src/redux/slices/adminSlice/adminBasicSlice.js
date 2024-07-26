import { createSlice } from "@reduxjs/toolkit";
import { adminBasicDetails } from "./adminBasicAction";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const adminBasicSlice = createSlice({
  name: "admindata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminBasicDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminBasicDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(adminBasicDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminBasicSlice.reducer;
