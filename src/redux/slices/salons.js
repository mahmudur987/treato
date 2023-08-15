import { createSlice } from "@reduxjs/toolkit";

import { salonContent } from "../../pages/Salons/SalonsContent";

const initialState = {
  salonContent: salonContent,
};

const salons = createSlice({
  name: "salon",
  initialState,
  reducers: {
   updateSalonContent: (state, action) => {
      state.salonContent = action.payload;
    },
    resetSalonContent: (state) => {
        state.salonContent = salonContent;
      },
  },
});
export const { updateSalonContent,resetSalonContent } = salons.actions;

export default salons.reducer;
