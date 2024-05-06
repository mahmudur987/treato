import { useQuery } from "react-query";
import axiosInstance from "../axios";
export const adminToken = localStorage.getItem("jwtToken");
export const useStatistics = (x) => {
  const headers = {
    token: adminToken,
  };
  return useQuery({
    queryKey: [x],
    queryFn: async () => {
      const { data } = await axiosInstance.post(
        "super/statistics",
        {
          days: Number(x?.slice(5, 7)),
        },
        { headers }
      );

      return data;
    },
  });
};
export const useBillingHistory = () => {
  const headers = {
    token: adminToken,
  };
  return useQuery({
    queryKey: ["allbillinghistory"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "super/allbillinghistory",

        { headers }
      );

      return data;
    },
  });
};
export const usePendingSalons = () => {
  const headers = {
    token: adminToken,
  };
  return useQuery({
    queryKey: ["allpartnerapproval"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "super/allpartnerapproval",

        { headers }
      );

      return data;
    },
  });
};
export const useActiveSalons = () => {
  const headers = {
    token: adminToken,
  };
  return useQuery({
    queryKey: ["allactivesalons"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "super/allactivesalons",

        { headers }
      );

      return data;
    },
  });
};
export const useSalonDetails = (id) => {
  const headers = {
    token: adminToken,
  };
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/singlesalondetail/${id}`,

        { headers }
      );

      return data;
    },
  });
};
export const useSalonDetailsServices = (id) => {
  const headers = {
    token: adminToken,
  };
  return useQuery({
    queryKey: [id, "singlesalonservices"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/singlesalonservices/${id}`,

        { headers }
      );

      return data;
    },
  });
};
