import axios, { AxiosRequestConfig } from "axios"

const axiosInstance = axios.create({

    baseURL: "http://127.0.0.1:8000/api/v1/",
    headers: {
        'Content-Type':"application/json"
    }
})

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    async (error) => {
       const originalRequest = error.config as AxiosRequestConfig & { retry?: boolean };

       if(error.response?.status === 401 && originalRequest._retry){
            //refresh token here
       }
       return Promise.reject(error)
    }

)
export default axiosInstance