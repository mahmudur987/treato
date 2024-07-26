
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

export const jobApplicationData = async (formData) => {
  
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  try {
    const res = await axiosInstance.post("/career/jobformapply", formData,{headers});

    
    return { res: res.data, err: null }
    
  } catch (error) {
    console.log(error)
    return { err: error.response.data, res: null };
  }
};


export const contactDetails = async (formData) => {

  
  try {
    const res = await axiosInstance.post("/reports/contactUs", formData);

    
    return { res: res.data, err: null }
    
  } catch (error) {
    console.log(error)
    return { err: error, res: null };
  }
};











