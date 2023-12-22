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
     baseURL: "http://localhost:4000/api/v1",
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
