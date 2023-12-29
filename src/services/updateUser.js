import { toFormData } from 'axios';
import axiosInstance from './axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const updateUser = async (userJWT,data) => {
   try {
      console.log("updateUser data",data);
      const res = await axiosInstance.patch(`profile/update`,data,{
         headers: {
            'token': userJWT,
            }
         
       })
      console.log( res);
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}

