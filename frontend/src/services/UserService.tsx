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

const pagination = async () => {
    try {
        const response = await apiCall.get('/users'); // Initial request
        console.log('API Response:', response.data);
        return response.data; // Return the data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token might be expired, try to refresh it
            try {
                const newToken = await refreshToken(); // Call the refresh token function
                localStorage.setItem('accessToken', newToken); // Update the access token
                // Retry the original request
                const response = await apiCall.get('/users');
                console.log('API Response after refresh:', response.data);
                return response.data; // Return the data
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                throw refreshError; // Handle the refresh error
            }
        } else {
            console.error('Error fetching users:', error); // Log other errors
            throw error; // Rethrow the error for handling elsewhere
        }
    }
};


const refreshToken = async () => {
    try {
        const response = await apiCall.post('/auth/refresh');
        const { access_token } = response.data;
        //console.log('access_token', access_token)
        return access_token;
    } catch (error) {
        throw new Error('Cannot re-create access token');
    }
};

export { pagination, refreshToken };
