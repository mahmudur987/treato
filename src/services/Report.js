import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useAppointmentsReport = (query) => {
  return useQuery({
    queryKey: [query, "reports/appointmentsByDays"],
    queryFn: async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        token: jwtToken,
      };
      let url = `reports/appointmentsByDays?${query}`;

      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
export const useClientsReport = (query) => {
  return useQuery({
    queryKey: [query, "reports/clientsReport"],
    queryFn: async () => {
      let url = `reports/clientsReport?${query}`;
      // console.log(url);
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        token: jwtToken,
      };
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
export const useBillingReport = (query) => {
  return useQuery({
    queryKey: [query, "reports/salonbillinghistory"],
    queryFn: async () => {
      // let url = `reports/clientsReport?${query}`;
      let url = `/reports/salonbillinghistory?${query}`;
      // console.log(url);
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        token: jwtToken,
      };
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
