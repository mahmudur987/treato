import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatePage: null,
};

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdminPage: (state, action) => {
      state.updatePage = !state.updatePage;
    },
  },
});

export const { updateAdminPage } = admin.actions;

export default admin.reducer;
