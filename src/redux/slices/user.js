import { createSlice } from "@reduxjs/toolkit";
import { fetchIPInfo } from "../../services/user";

const initialState = {
  isLoggedIn: false,
  user: {
    role: "",
    first_name: "",
    latitude: null,
    longitude: null,
    isLocationAllow: false,
  },
  OTP: 0,
  tempLoginInfo: {},
  newPartner: {
    emptyMandatoryFields: [],
    isProfileComplete: false,
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    updateUserDetails: (state, { payload }) => {
      // console.log(payload);
      state.user = { ...state.user, ...payload?.data };
      state.newPartner.isProfileComplete = payload?.isProfileComplete;
      state.newPartner.emptyMandatoryFields = payload?.emptyMandatoryFields;
      state.toggle = !state.toggle;
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
  updateUser,
  updateOTP,
  updateTempLoginInfo,
  resetTempLoginInfo,
  resetUserDetails,
} = user.actions;
export default user.reducer;
