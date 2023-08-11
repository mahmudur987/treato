import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
   user: {}
};

const user = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateIsLoggedIn: (state, { payload }) => {
         state.isLoggedIn = payload;
      },
      updateUserDetails: (state, { payload }) => {
         state.user = payload
      },
   },
});

export const { updateIsLoggedIn, updateUserDetails } = user.actions;
export default user.reducer;
