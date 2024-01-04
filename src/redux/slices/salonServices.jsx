import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    salonContent: [],
    Amount: null,
    appliedOffer: null
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
    },
});

export const { addService, updateAmount, updateAppliedOffer } = salonServices.actions;
export default salonServices.reducer;
