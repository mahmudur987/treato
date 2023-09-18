import axiosInstance, { operation } from './_axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const register = async (data) => {
   try {
      const res = await axiosInstance.post(`/`, data)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}
