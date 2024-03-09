import { useQuery } from "react-query";
import axiosInstance from "./axios";

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const salon = async () => {
  try {
    const res = await axiosInstance.get(`salon/list`);
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const getSalonListBySearchInput = async (serviceName, salonlocation) => {
  try {
    const res = await axiosInstance.get(
      `salon/combineSearch?service=${serviceName}&location=${salonlocation}`
    );
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const getSalonListByServiceLocation = async (
  serviceName,
  locationLat,
  locationLng
) => {
  try {
    const res = await axiosInstance.get(
      `salon/getSalonByLatLngService?service=${serviceName}&latitude=${locationLat}&longitude=${locationLng}`
    );
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const getSingleSalonData = async (id) => {
  try {
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    const res = await axiosInstance.get(`salon/getOneSalon`, { headers });

    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const useSingleSalon = () => {
  return useQuery({
    queryKey: [""],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance.get(`salon/getOneSalon`, {
        headers,
      });

      return data;
    },
  });
};

export const addNewService = async (data) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  try {
    const res = await axiosInstance.patch("service/addNewSubcategory", data, {
      headers,
    });

    return { res: res.data, err: null };
  } catch (error) {
    return { res: null, err: error };
  }
};
export const editService = async (data) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  try {
    const res = await axiosInstance.patch("/service/editSubCategory", data, {
      headers,
    });

    return { res: res.data, err: null };
  } catch (error) {
    return { res: null, err: error };
  }
};
