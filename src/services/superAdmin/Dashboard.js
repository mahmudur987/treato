import { useQuery } from "react-query";
import axiosInstance from "../axios";
export const adminToken = localStorage.getItem("jwtToken");
export const useStatistics = (x) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [x, adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.post(
        "super/statistics",
        {
          days: Number(x?.slice(5, 7)),
        },
        { headers }
      );

      return data;
    },
  });
};
export const useBillingHistory = (x, y) => {
  let url = `super/allbillinghistory?${
    x !== "All Booking" ? `booking=${x.toLowerCase()}` : ""
  }`;
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["allbillinghistory", x, y, adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { headers });

      return data;
    },
  });
};
export const usePendingSalons = (x) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["allpartnerapproval", x, adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/allpartnerapproval?search=${x}`,

        { headers }
      );

      return data;
    },
  });
};
export const useActiveSalons = (x) => {
  let url = `super/allactivesalons?salonname=${x ? x : ""}`;
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["allactivesalons", x, adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        url,

        { headers }
      );

      return data;
    },
  });
};
export const getCities = async () => {
  let url = `super/allcity`;
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  try {
    const { data } = await axiosInstance.get(
      url,

      { headers }
    );
    return data?.cities;
  } catch (error) {
    return ["city"];
  }
};

export const useSalonDetails = (id) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [id, adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/singlesalondetail/${id}`,

        { headers }
      );

      return data;
    },
  });
};
export const useSalonDetailsServices = (id) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [id, "singlesalonservices", adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/singlesalonservices/${id}`,

        { headers }
      );

      return data;
    },
  });
};
export const useSalonDetailsBookings = (id, x) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [id, "singlesalonbookings", adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/singlesalonbookings/${id}?status=${
          x !== "All" ? x.toLowerCase() : ""
        }`,

        { headers }
      );

      return data;
    },
  });
};
export const useSalonReviews = (id) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [id, "singlesalonbookings", adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/salonallreviews?salon_id=${id}`,

        { headers }
      );

      return data;
    },
  });
};
export const useSalonImages = (id) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [id, "salonImages", adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/allsalonimages?salon_id=${id}`,

        { headers }
      );

      return data;
    },
  });
};
export const useSalonBillAndPayment = (filter) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [filter, "salonOrderhistory", adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/salonorderhistory?${filter}`,

        { headers }
      );

      return data;
    },
  });
};
export const useGetDeactivatedSalons = (x) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["deactivated", x, adminToken],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `super/alldeactivatedsalon?salonname=${x}`,

        { headers }
      );

      return data;
    },
  });
};
