import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

export const adminBasicDetails = createAsyncThunk(
  "admindata/add",
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/salon/updateSalon",
        requestData,
        {
          headers: {
            token: localStorage.getItem("jwtToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
