import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
   user: {
      role: 'ADMIN',
      first_name: '',
      latitude: null,
      longitude: null,
   },
   OTP:0,
   tempLoginInfo:{},
};

const user = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateIsLoggedIn: (state, { payload }) => {
         state.isLoggedIn = payload;
      },
      updateUserDetails: (state, { payload }) => {
         state.user = { ...state.user, ...payload };
      },
      resetUserDetails: (state, { payload }) => {
         state.user = { };
      },
      updateOTP: (state, { payload }) => {
         state.OTP = payload;
      },
      updateTempLoginInfo: (state, { payload }) => {
         state.tempLoginInfo = { ...state.tempLoginInfo, ...payload };
      },
      resetTempLoginInfo: (state) => {
         state.tempLoginInfo = {};
      },
   },
});

export const { updateIsLoggedIn, updateUserDetails,updateOTP,updateTempLoginInfo,resetTempLoginInfo,resetUserDetails } = user.actions;
export default user.reducer;
