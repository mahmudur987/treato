import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatePage: false,
  searchText: "",
};

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdminPage: (state, action) => {
      state.updatePage = !state.updatePage;
    },
    updateSearchText: (state, action) => {
      state.searchText = action.payload.searchText;
    },
  },
});

export const { updateAdminPage, updateSearchText } = admin.actions;

export default admin.reducer;
