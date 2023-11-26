import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   Data: {}
};

const lookbook = createSlice({
   name: "lookbook",
   initialState,
   reducers: {
    updateLookbookData: (state, { payload }) => {
        state.Data = {...payload };
      },
   },
});

export const { updateLookbookData } = lookbook.actions;
export default lookbook.reducer;
