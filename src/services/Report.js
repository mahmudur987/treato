import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useAppointmentsReport = (query) => {
  let url = `reports/appointmentsByDays?${query}`;
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    token: jwtToken,
  };

  return useQuery({
    queryKey: [query, "reports/appointmentsByDays"],
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
    queryKey: [query, "reports/clientsReport"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
export const useBillingReport = (query) => {
  // let url = `reports/clientsReport?${query}`;
  let url = `/reports/salonbillinghistory?${query}`;
  // console.log(url);
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    token: jwtToken,
  };

  return useQuery({
    queryKey: [query, "reports/salonbillinghistory"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
