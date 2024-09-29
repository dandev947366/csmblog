import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const axiosInstance = axios.create({

    baseURL: "http://127.0.0.1:8000/api/v1/",
    headers: {
        'Content-Type': "application/json"
    }
})

export const baseUrl = "http://127.0.0.1:8000/api/v1/"

const apiCall: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json",
        'Accept' : "application/json"
     }

})

const refreshToken = async () => {
    try {
        const response = await apiCall.post('/auth/refresh')
        return response.data
    } catch (error) {
        throw new Error('Can not re-create access token')
    }

}

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    async (error:AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { retry?: boolean };
        if (error.response?.status === 401 && originalRequest._retry) {
            console.log(123)
            originalRequest._retry = true
            try {
                const userData = await refreshToken()
                return apiCall(originalRequest)
            } catch (error) {

                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }


)
// axios.defaults.withCredentials = true
// axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1"
// axios.defaults.headers.common['Content-Type'] = "application/json"
// axios.defaults.headers.common['Accept'] = "application/json"

export default apiCall