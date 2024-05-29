import axiosInstance from './axios'

export const GetCalenderdata = async () => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };///reports/calenderReport?date=2024-04-04
        const res = await axiosInstance.get(`/reports/calenderReport`, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}
export const otpVerification = async (otp) => {
   console.log(otp)
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.post(`/reports/otpverification`,otp, { headers });
        console.log(res)
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}
export const cancelAppointment = async (id) => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.patch(`/reports/cancelappointment`,{id}, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}
export const completeAppointment = async (id) => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.patch(`/reports/completeappointment`,{id}, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}
export const noShow = async (id) => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.patch(`/reports/noshowappointment`,{id}, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}
export const startedAppointment = async (id) => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.patch(`/reports/startedappointment`,{id}, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}