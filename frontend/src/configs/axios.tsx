import axios from "axios"

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
    error => {
       const { response } = error
       if(response.status === 401){
            //refresh token here
       }
       return Promise.reject(error) 
    }

)
export default axiosInstance