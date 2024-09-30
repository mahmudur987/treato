import { useQuery } from "react-query";
import axiosInstance from "./axios";

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const getAllServices = async () => {
  try {
    const res = await axiosInstance.get(`/service/list`);

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
export const useGetPartnerServices = () => {
  const token = localStorage.getItem("jwtToken");
  const headers = { token };
  return useQuery({
    queryKey: ["servicess"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("service/salonservices", {
        headers,
      });
      return data;
    },
  });
};
export const useGetServices = () => {
  return useQuery({
    queryKey: ["service/getAllServices"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("service/getAllServices", {});
      return data;
    },
  });
};
