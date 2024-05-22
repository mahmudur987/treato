import { useQuery } from "react-query";
import axiosInstance from "./axios";

export const useAllLook = () => {
  return useQuery({
    queryKey: ["look-book/view-all"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("look-book/view-all");
      return data;
    },
  });
};
export const useSingleLook = (id) => {
  return useQuery({
    queryKey: ["look", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`look-book/view/${id}`);
      return data;
    },
  });
};
