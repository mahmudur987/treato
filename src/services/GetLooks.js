import axiosInstance from './axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const GetLooks = async () => {
   try {
      const res = await axiosInstance.get(`look-book/view-all`)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}
