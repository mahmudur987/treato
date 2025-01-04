import { useQuery } from "react-query";
import axiosInstance from "../axios";

export const useGetAdminPayment = (query) => {
  return useQuery({
    queryKey: ["adminPayment", query],
    queryFn: async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        token: jwtToken,
      };
      const { data } = await axiosInstance.get(
        `/super/getAllPaymentsDetails?${query}`,
        {
          headers,
        }
      );
      return data;
    },
  });
};
