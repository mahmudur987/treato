import axiosInstance from './axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const salon = async () => {
   try {
      const res = await axiosInstance.get(`salon/list`)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}

export const getSalonListBySearchInput=async(serviceName,salonlocation)=>{
   try{
      const res = await axiosInstance.get(`salon/combineSearch?service=${serviceName}&location=${salonlocation}`)
      return { res: res, err: null }
   }
   catch(error){
      return { err: error, res: null }
   }
}

export const getSingleSalonData = async (id) => {
   try {
      const res = await axiosInstance.get(`salon/getOneSalon/${id}`)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}
