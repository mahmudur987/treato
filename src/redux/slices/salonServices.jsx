import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonContent: [],
  serviceDate: null,
  serviceTime: null,
  serviceTaxPrice: null,
  Amount: null,
  appliedOffer: null,
  offerAmount: null,
};

const salonServices = createSlice({
  name: "salonServices",
  initialState,
  reducers: {
    addService: (state, action) => {
      state.salonContent = action.payload;
    },
    updateAmount: (state, action) => {
      state.Amount = action.payload;
    },
    updateAppliedOffer: (state, action) => {
      state.appliedOffer = action.payload;
    },
    updateServiceDate: (state, action) => {
      state.serviceDate = action.payload;
    },
    updateServiceTime: (state, action) => {
      state.serviceTime = action.payload;
    },
    updateOfferAmount: (state, action) => {
      state.offerAmount = action.payload;
    },
    updateServiceTaxPrice: (state, action) => {
      state.serviceTaxPrice = action.payload;
    },
    resetSalonServicesState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addService,
  updateAmount,
  updateAppliedOffer,
  updateServiceDate,
  updateServiceTime,
  updateServiceTaxPrice,
  resetSalonServicesState,
  updateOfferAmount,
} = salonServices.actions;
export default salonServices.reducer;
