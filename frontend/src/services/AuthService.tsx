import axiosInstance from "../configs/axios";
import { handleAxiosError } from "../helpers/axiosHelper";
import { User } from "../types/User";

// Login function
const login = async (payload: LoginPayload): Promise<{ user: User, accessToken: string, refreshToken: string } | null> => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        });

        const { access_token, refresh_token, user } = response.data;

        // Store the access token in localStorage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        return {
            user,
            accessToken: access_token,
            refreshToken: refresh_token
        };

    } catch (error) {
        handleAxiosError(error);
        return null;
    }
};

// Fetch User function
const fetchUser = async (): Promise<User | null> => {
        const response = await axiosInstance.get('/auth/me');
        console.log('fetch user data : ' , response.data.user); // Log the user data
        //return response.data.user; // Return the user data
};

export { login, fetchUser };
