import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useGetOutStandingPaymentStatus = (query) => {
  let url = `/salon/outstandingcom`;
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    token: jwtToken,
  };

  return useQuery({
    queryKey: [query, url],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
