import axiosInstance from './axios'

export const GetCalenderdata = async () => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.get(`https://backend.treato.in/api/v1/reports/calenderReport?date=2024-03-10`, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}