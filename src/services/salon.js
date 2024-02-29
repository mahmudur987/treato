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
    // const jwtToken = localStorage.getItem("jwtToken");
    // if (!jwtToken) {
    //   throw new Error("JWT token is not available");
    // }

    // Set up headers with the JWT token
    const headers = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2EzOWI2NmI5NjM4OWFmOTIzN2U4YyIsImlhdCI6MTcwODc4NDg3NywiZXhwIjoxNzA5MjE2ODc3fQ.bRdI2LX63GKUAW2Kl2WfhbeXw743s7zzAohWO0xezLE",
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
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2EzOWI2NmI5NjM4OWFmOTIzN2U4YyIsImlhdCI6MTcwODc4NDg3NywiZXhwIjoxNzA5MjE2ODc3fQ.bRdI2LX63GKUAW2Kl2WfhbeXw743s7zzAohWO0xezLE",
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
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2EzOWI2NmI5NjM4OWFmOTIzN2U4YyIsImlhdCI6MTcwODc4NDg3NywiZXhwIjoxNzA5MjE2ODc3fQ.bRdI2LX63GKUAW2Kl2WfhbeXw743s7zzAohWO0xezLE",
  };
  try {
    const { data } = await axiosInstance.post("/service/new", data, {
      headers,
    });

    return { res: data, err: null };
  } catch (error) {
    return { res: null, err: error };
  }
};
