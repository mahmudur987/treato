import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useGetALLAuthPageImages = () => {
  return useQuery({
    queryKey: ["crud/getallauth"],
    queryFn: async () => {
      let url = "crud/getallauth";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetAllDetails = () => {
  return useQuery({
    queryKey: ["crud/allDetails"],
    queryFn: async () => {
      let url = "crud/allDetails";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetMainTitleSmallTitle = () => {
  return useQuery({
    queryKey: ["crud/mainTitleSmallTitle"],
    queryFn: async () => {
      let url = "crud/mainTitleSmallTitle";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetAllTeam = () => {
  return useQuery({
    queryKey: ["crud/getallteam"],
    queryFn: async () => {
      let url = "crud/getallteam";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetAllStatus = () => {
  return useQuery({
    queryKey: ["crud/getallstatus"],
    queryFn: async () => {
      let url = "crud/getallstatus";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetAllTitle = () => {
  return useQuery({
    queryKey: ["/crud/getalltitle"],
    queryFn: async () => {
      let url = "/crud/getalltitle";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetAllLegal = () => {
  return useQuery({
    queryKey: ["/crud/getalllegal"],
    queryFn: async () => {
      let url = "/crud/getalllegal";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
