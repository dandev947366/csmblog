// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLogin: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAuthLogout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
});

export const { setAuthLogin, setAuthLogout } = authSlice.actions;
export default authSlice.reducer;
