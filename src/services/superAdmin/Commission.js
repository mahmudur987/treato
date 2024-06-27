import { useQuery } from "react-query";
import axiosInstance from "../axios";

const fetchCommissionStats = async (days, token) => {
  let url = `super/getCommissionStats?days=${Number(days?.slice(5, 7))}`;

  const response = await axiosInstance.get(url, {
    headers: {
      token: token,
    },
  });
  return response.data;
};

export const useCommissionStatistics = (days) => {
  const token = localStorage.getItem("jwtToken");

  return useQuery({
    queryKey: ["commissionStats", days, token],
    queryFn: () => fetchCommissionStats(days, token),
    enabled: !!days && !!token, // Only run the query if days and token are provided
    retry: 3, // Retry the query up to 3 times in case of failure
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useCommissionHistory = (x) => {
  let url = `super/getCommissionHistory?${x}`;

  console.log(url);

  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["getCommissionHistory"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
