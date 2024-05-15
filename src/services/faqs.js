import axiosInstance from './axios'


export const getFaqs = async (data) => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.get(`faq/getfaq?topic=${data}`, { headers });
   //  console.log(res);
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}