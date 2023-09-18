import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import retry from 'retry'

export const operation = retry.operation({
   retries: 3,
   factor: 2,
   minTimeout: 1000,
   maxTimeout: 10000,
   randomize: true,
})

const axiosInstance = axios.create({
   //   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
   baseURL: '<backendlink>',
})

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response.status === 401) {
         console.log('401')
      }

      if (error.response.status === 404) {
         console.log('404')
      }

      console.log('Other Error')
      return Promise.reject(error)
   },
)

export default axiosInstance
