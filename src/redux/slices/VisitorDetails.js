import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: false,
  contact: {
    name: "",
    phone: "",
    email: "",
    preferences: "",
  },
};

const VisitorDetails = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    updateVisitorContent: (state, action) => {
      state.guest = action.payload.guest;
      state.contact.name = action.payload.contact.name;
      state.contact.phone = action.payload.contact.phone;
      state.contact.email = action.payload.contact.email;
      state.contact.preferences = action.payload.contact.preferences;
    },
    resetVisitorState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateVisitorContent, resetVisitorState } =
  VisitorDetails.actions;

export default VisitorDetails.reducer;
