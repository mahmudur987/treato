import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useGetAllTeamMembers = () => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [""],
    queryFn: async () => {
      const { data } = await axiosInstance.get("stylist/teamMembers", {
        headers,
      });
      return data;
    },
  });
};
export const useGetAllTeamMemSche = () => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["stylist/teamSchedule"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("stylist/teamSchedule", {
        headers,
      });

      return data;
    },
  });
};
