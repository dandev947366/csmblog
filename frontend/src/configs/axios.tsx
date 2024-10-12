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
        // Store the new token in localStorage or wherever you manage tokens
        localStorage.setItem('accessToken', access_token);
        return access_token; // Return the new token
    } catch (error) {
        throw new Error('Cannot re-create access token');
    }
};

// Request interceptor to add the access token to headers
apiCall.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken'); // Retrieve the token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
        } else {
            console.error('No token found in local storage'); // Log if no token is found
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// Response interceptor for handling token refresh
apiCall.interceptors.response.use(
    response => response, // Pass successful responses through
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Check if the response status is 401 and if the request has not been retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loop
            try {
                const newAccessToken = await refreshToken();
                // Ensure headers are defined before modifying them
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                } else {
                    originalRequest.headers = {
                        'Authorization': `Bearer ${newAccessToken}`,
                    };
                }
                return apiCall(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError); // Handle refresh token error
            }
        }
        return Promise.reject(error); // Reject any other errors
    }
);

export default apiCall;
