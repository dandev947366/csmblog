import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1/";

const apiCall: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
    }
});

// Refresh token function
const refreshToken = async () => {
    try {
        const response = await apiCall.post('/auth/refresh');
        const { access_token } = response.data;
        return access_token; // Return the new token
    } catch (error) {
        throw new Error('Cannot re-create access token');
    }
};
apiCall.interceptors.request.use();


apiCall.interceptors.response.use(
    response => { return response }, // Pass successful responses through
    async (error) => {
        console.log('2123')

    }
        // const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true; // Prevent infinite retry loops
        //     try {
        //         const newAccessToken = await refreshToken();
        //         console.log('newAccessToken: ', newAccessToken)
                // apiCall.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                //return apiCall(originalRequest);
    //         } catch (refreshError) {
    //             console.error('Token refresh failed:', refreshError);
    //             return Promise.reject(refreshError);
    //         }
    //     }
    //     return Promise.reject(error);
    // }
);

export default apiCall;
