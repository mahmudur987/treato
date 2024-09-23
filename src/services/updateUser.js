import axiosInstance from "./axios";

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const updateUser = async (userJWT, data) => {
  try {
    const res = await axiosInstance.patch(`profile/update`, data, {
      headers: {
        token: userJWT,
      },
    });

    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
