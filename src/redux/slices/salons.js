import { createSlice } from "@reduxjs/toolkit";

import { salonContent } from "../../pages/Salons/SalonsContent";

const initialState = {
  salonContent: salonContent,
  filterContent: salonContent,
};

const salons = createSlice({
  name: "salon",
  initialState,
  reducers: {
   updateSalonContent: (state, action) => {
      state.filterContent = action.payload;
    },
    resetSalonContent: (state) => {
        state.filterContent = salonContent;
      },
  },
});
export const { updateSalonContent,resetSalonContent } = salons.actions;

export default salons.reducer;
