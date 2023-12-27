import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    salonContent: []
};

const salonServices = createSlice({
    name:"salonServices",
    initialState,
    reducers: {
        addService: (state,action)=>{
            state.salonContent = action.payload
        }
    }
})
export const { addService } = salonServices.actions
export default salonServices.reducer;