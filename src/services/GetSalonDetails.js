import axiosInstance from './axios'

export const GetSalonDetails = async () => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.get(`salon/getOneSalon`, { headers });
    console.log(res);
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}