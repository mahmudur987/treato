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