import { toast } from "react-toastify";
import axiosInstance from "./axios";

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const register = async (data) => {
  try {
    const res = await axiosInstance.post(`/registration`, data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const login = async (data) => {
  try {
    const res = await axiosInstance.post(`/login`, data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const sendLoginOTP = async (data) => {
  try {
    const res = await axiosInstance.post(`/user/otpsignup`, data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const sendNumberChangeOTP = async (data) => {
  try {
    const res = await axiosInstance.post(`/user/otpsignin`, data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const otpsignin = async (data) => {
  try {
    const res = await axiosInstance.post(`/user/otpsignin`, data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const forgotpasswordLink = async (data) => {
  try {
    const res = await axiosInstance.post(`/login/forgot-password-link`, data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const resetPassword = async (id, token, newPassword) => {
  try {
    const url = `/login/reset-password?id=${id}&token=${token}`;

    const data = { password: newPassword };

    const response = await axiosInstance.patch(url, data);

    if (response.status === 200) {
      // Password reset was successful
      return { success: true };
    } else {
      // Password reset failed
      return { success: false };
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    return { success: false, error: error };
  }
};

export const getUserProfile = async (jwtToken) => {
  try {
    // Retrieve the JWT token from localStorage
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.get("/profile", { headers });

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const facebookAuth = async (token, redirectUri) => {
  try {
    const data = { token, redirectUri };
    console.log(data);
    const res = await axiosInstance.post("/auth/facebook", data);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

//google and facebook login
export const facebook_Login = async (data) => {
  try {
    const res = await axiosInstance.post(`/facebook`, data);
    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const google_Login = async (access_token, role) => {
  if (!role) {
    return toast.error("role is missing");
  }

  try {
    const res = await axiosInstance.post(`/google`, { access_token, role });
    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
