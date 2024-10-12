import axiosInstance from "../configs/axios";
import { handleAxiosError } from "../helpers/axiosHelper";
import { User } from "../types/User";
import { LoginPayload } from "../types/Login";
// Login function
const login = async (payload: LoginPayload): Promise<{ user: User; accessToken: string; refreshToken: string } | null> => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        });
        //console.log('response.data', response.data)
        const { access_token, refresh_token, user } = response.data;
        console.log('access token', response.data?.access_token)
        console.log('refresh_token', response.data?.refresh_token)

        // Store the access token in localStorage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        return {
            user,
            accessToken: access_token,
            refreshToken: refresh_token
        };

    } catch (error) {
        handleAxiosError(error);  // Handle the error appropriately
        return null;  // Return null in case of an error
    }
};

// Fetch User function
const fetchUser = async (): Promise<User | null> => {
    try {
        const response = await axiosInstance.get('/auth/me');

        if (response.data && response.data.user) {
            console.log('Fetched user data:', response.data.user); // Log the user data
            return response.data.user; // Return the user data
        } else {
            console.error('User data not found in response:', response.data);
            return null; // Return null if user data is not found
        }
    } catch (error) {
        handleAxiosError(error);  // Handle errors from the fetch request
        return null; // Return null in case of an error
    }
};

export { login, fetchUser };
