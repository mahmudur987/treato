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
