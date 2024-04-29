
import axiosInstance from './axios'

export const GetPostDetails = async () => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.get(`https://backend.treato.in/api/v1/career/alljobopening`, { headers });
   //  console.log(res);
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}

export const jobApplicationData = async (data) => {
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  try {
    const res = await axiosInstance.post("https://backend.treato.in/api/v1/career/jobformapply", data, {headers});

    alert("data send.")
    // return { res: res.data, err: null };
  } catch (error) {
    alert("data not send.")
    // return { res: null, err: error };
  }
};


export const contactDetails = async (data) => {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const res = await axiosInstance.post(`/reports/contactUs`, data, {
      headers: {
        token: jwtToken,
      },
    });
    alert("data send.")
    return { res: res, err: null };
  } catch (error) {
    alert("data not send.")
    return { err: error, res: null };
  }
};
