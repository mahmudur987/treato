import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useAppointmentsReport = (query) => {
  let url = `reports/appointmentsByDays?${query}`;
  // console.log(url);
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    token: jwtToken,
  };

  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
export const useClientsReport = (query) => {
  let url = `reports/clientsReport?${query}`;
  // console.log(url);
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    token: jwtToken,
  };

  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
