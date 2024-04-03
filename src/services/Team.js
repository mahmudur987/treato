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
export const useGetAllTeamMemSche = (startDate, endDate) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["stylist/teamSchedule", startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/stylist/teamSchedule?startDate=${startDate}&endDate=${endDate}`,
        {
          headers,
        }
      );

      return data;
    },
  });
};

export const useGetSingleMember = (id) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`stylist/getOneStylist/${id}`, {
        headers,
      });
      return data;
    },
  });
};
export const useGetSlots = () => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["slotsByDay"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/salon/slotsByDay`, {
        headers,
      });
      return data;
    },
  });
};
