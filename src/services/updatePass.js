import axiosInstance from './axios'
import { toast } from "react-toastify";

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const updatePass = async (userJWT,data) => {
   try {
      console.log( userJWT,data);
      const res = await axiosInstance.patch(`profile/update_password`, data,{
         headers: {
         'token': userJWT,
         }
        
       })
       if (res) {
         toast("Password Updated Successfully")
      }
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}



export const setPass = async (userJWT, data) => {
   console.log(data);
   try {
     const res = await axiosInstance.patch(
       `profile/setPassword`,
       {
         headers: {
           "token": userJWT,
         },
       },
       data
     );
     return { res: res, err: null };
   } catch (error) {
     return { err: error, res: null };
   }
 };