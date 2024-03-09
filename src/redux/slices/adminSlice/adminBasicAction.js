import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "./api"
export const adminBasicDetails = createAsyncThunk("admindata/add", async ( data, {getState, rejectWithValue }) => {

    console.log("salonData",data);
    try {
       
        const { data } = await api.post("/salon/new",data,{
            headers:{
                token: localStorage.getItem("jwtToken"),
              }
        })
        // console.log("data");
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }

})