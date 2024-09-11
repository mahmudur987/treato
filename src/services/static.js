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
