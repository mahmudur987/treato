// modalSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalContent: null,
};

const filterModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.showModal = true;
      state.modalContent = payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = filterModal.actions;
export default filterModal.reducer;
