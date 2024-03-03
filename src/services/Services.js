import axiosInstance from "./axios";

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const getAllServices = async () => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };
    const res = await axiosInstance.get(`/service/list`, headers);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const getSingleServices = async (id) => {
  try {
    const res = await axiosInstance.get(`/service/${id}`);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
