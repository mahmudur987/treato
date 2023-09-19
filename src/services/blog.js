import axiosInstance, { operation } from './axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const AllBlogs = async () => {
   try {
      const res = await axiosInstance.get(`blog/list`)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}
