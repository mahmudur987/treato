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
    queryKey: ["salon/getOneSalon"],
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
export const useGetTemMembers = () => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: ["appointment/getSalonClients"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("appointment/getSalonClients", {
        headers,
      });
      return data;
    },
  });
};

export const createSalon = async () => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  const data = {
    salon_name: "New Salon Name",
    salons_description: "New Salon Description",
    salons_address: "New Salon Address",
    services_provided: [],
    website: "www.example.com",
    location_details: {
      location: "Business Location",
      building_number: "HB-072",
      landmark: "Near XYZ",
      city: "Mumbai",
      postal_code: "100102",
    },
    locationText: "Address",
    location: {
      type: "Point",
      coordinates: [17.385, 78.4867],
    },
    working_hours: [
      {
        day: "Monday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",
      },
      {
        day: "Tuesday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",
      },
      {
        day: "Wednesday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",
      },
      {
        day: "Thursday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",
      },
      {
        day: "Friday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",
      },
      {
        day: "Saturday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",
      },
      {
        day: "Sunday",
        opening_time: "9:00 AM",
        closing_time: "5:30 PM",
      },
    ],
  };
  try {
    const res = await axiosInstance.patch("/salon/new", data, {
      headers,
    });

    return { res: res.data, err: null };
  } catch (error) {
    return { res: null, err: error };
  }
};
