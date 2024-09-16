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
export const useGetCarer = () => {
  return useQuery({
    queryKey: ["/crud/getcareer"],
    queryFn: async () => {
      let url = "/crud/getcareer";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetAlSubscription = () => {
  return useQuery({
    queryKey: ["/crud/getallsubscription"],
    queryFn: async () => {
      let url = "/crud/getallsubscription";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
export const useGetContactUs = () => {
  return useQuery({
    queryKey: ["/crud/contactimage"],
    queryFn: async () => {
      let url = "/crud/contactimage";
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};
