import axiosInstance from './axios'

/** Register the user after Verifying the OTP `POST: /api/auth/register/` */
export const HomePage = async () => {
   try {
      const res = await axiosInstance.get(`homePageCMS/show`)
      return { res: res, err: null }
   } catch (error) {
      return { err: error, res: null }
   }
}
