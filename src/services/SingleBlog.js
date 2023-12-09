import axiosInstance, { operation } from './axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const SingleBlog = async (id) => {
   try {
      const res = await axiosInstance.get(`blog/getBlog/${id}`)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}
