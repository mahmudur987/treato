// modalSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalContent: null,
  isMobileView: false,
};
function determineIsMobileView() {
  const mobileScreenWidthThreshold = 768; // Adjust as needed
  return window.innerWidth < mobileScreenWidthThreshold;
}

const filterModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.showModal = true;
      state.modalContent = payload;
      state.isMobileView = determineIsMobileView();
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalContent = null;
      state.isMobileView = false;
    },
  },
});

export const { openModal, closeModal } = filterModal.actions;
export default filterModal.reducer;
