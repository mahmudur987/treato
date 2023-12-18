import { createSlice } from "@reduxjs/toolkit";
import { fetchIPInfo } from "../../services/user";
import { updateUser } from "../../services/updateUser";

const initialState = {
  isLoggedIn: false,
  user: {
    role: "",
    first_name: "",
    latitude: null,
    longitude: null,
    isLocationAllow:false
  },
  OTP: 0,
  tempLoginInfo: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    updateUserDetails: (state, { payload }) => {
      console.log( "varshaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",payload);
     
      state.user = { ...state.user, ...payload};
     state.toggle= !state.toggle
    },
    resetUserDetails: (state, { payload }) => {
      state.user = { ...payload };
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
//   extraReducers:(builder)=>{
// builder.addCase(updateUser.pending, (state, { payload }) => {
//   state.loading = true
// })
//  .addCase(updateUser.fulfilled, (state, { payload }) => {
//   state.loading = false
//   state.user = { ...state.user, ...payload};
// })
//  .addCase(updateUser.rejected, (state, { payload }) => {
//   state.loading = false
// })
//   }
});

export const {
  updateIsLoggedIn,
  updateUserDetails,
  
  updateOTP,
  updateTempLoginInfo,
  resetTempLoginInfo,
  resetUserDetails,
} = user.actions;
export default user.reducer;
