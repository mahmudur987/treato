import { createSlice } from "@reduxjs/toolkit";
import { salon } from "../../services/salon";
import { getAllServices } from "../../services/Services";

const initialState = {
  salonContent: [], // Initialize salonContent as an empty array
  searchSalonResults: [],
  filterContent: [], // Initialize filterContent as an empty array
};

const salons = createSlice({
  name: "salon",
  initialState,
  reducers: {
    updateSalonContent: (state, action) => {
      state.salonContent = action.payload; // Update salonContent in the state
    },
    updateSearchSalonResults: (state, action) => {
      state.searchSalonResults = action.payload; // Update searchSalonResults in the state
    },
    updateFilterContent: (state, action) => {
      state.filterContent = action.payload; // Update filterContent in the state
    },
    resetSalonContent: (state) => {
      state.filterContent = state.salonContent; // Reset filterContent to the original salonContent
    },
  },
});

export const { updateSalonContent,updateSearchSalonResults, updateFilterContent, resetSalonContent } =
  salons.actions;


export default salons.reducer;
