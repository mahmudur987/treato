import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   role: ''
};

const authChoice = createSlice({
   name: "authChoice",
   initialState,
   reducers: {
      chooseRole: (state, { payload }) => {
         state.role = payload;
      },
   },
});

export const { chooseRole } = authChoice.actions;
export default authChoice.reducer;
