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
