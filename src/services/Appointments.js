import axiosInstance from "./axios";
import { useQuery } from "react-query";
export const getUpcomingAppointments = async () => {
  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.get("appointment/upcoming_list", {
      headers,
    });

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const useUpcomingApponments = () => {
  return useQuery({
    queryKey: [""],
    queryFn: getUpcomingAppointments,
  });
};
export const getCompletedAppointments = async () => {
  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.get("appointment/completed_list", {
      headers,
    });

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const getCancelledAppointments = async () => {
  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.get("appointment/cancel_list", { headers });

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const rescheduleAppointment = async (id, data) => {
  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.patch(
      `appointment/reschedule/${id}`,
      data,
      { headers }
    );

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const cancelleUpcomingdAppointment = async (id, data) => {
  console.log(id, data);

  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.patch(`appointment/cancel/${id}`, data, {
      headers,
    });

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const addReview = async (id, data) => {
  console.log(id, data);

  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.patch(`feedback/create?id=${id}`, data, {
      headers,
    });

    return { res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

const getTimeSlots = async (data) => {
  try {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Handle the case where the token is not available
      throw new Error("JWT token is not available");
    }

    // Set up headers with the JWT token
    const headers = {
      token: jwtToken,
    };

    // Make the GET request with headers
    const res = await axiosInstance.post("/appointment/generateSloats", data, {
      headers,
    });
    return { res: res.data, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
export const useTimeSlots = (data) => {
  return useQuery({
    queryKey: ["appointment/generateSloats", data],
    queryFn: () => getTimeSlots(data),
  });
};

export const getAvailableSlots = async (data) => {
  const jwtToken = localStorage.getItem("jwtToken");

  console.log("slots Data", data);
  try {
    const res = await axiosInstance.post(`/appointment/generateSloats`, data, {
      headers: {
        token: jwtToken,
      },
    });
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const getAvailableOffers = async (data) => {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const res = await axiosInstance.post(`appointment/salon/offers`, data, {
      headers: {
        token: jwtToken,
      },
    });
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};

export const bookSalonAppointment = async (data) => {
  const jwtToken = localStorage.getItem("jwtToken");
  console.log(data);
  try {
    const res = await axiosInstance.post(`/appointment/bookAppointment`, data, {
      headers: {
        token: jwtToken,
      },
    });

    return { res: res, err: null };
  } catch (error) {
    console.error("handlePaymentError", error);
    return { err: error, res: null };
  }
};

export const AppointmentVerify = async (data) => {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const res = await axiosInstance.post(`/order/paymentVerify`, data, {
      headers: {
        token: jwtToken,
      },
    });
    return { res: res, err: null };
  } catch (error) {
    return { err: error, res: null };
  }
};
