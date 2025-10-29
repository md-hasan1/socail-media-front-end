
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    email: string;
    role: 'USER' | 'ADMIN';
    iat: number;
    exp: number;
}
export interface IInitialState {
    user: IUser | null,

    token: string | null;

    isBioEditMode: boolean;
}


const initialState: IInitialState = {
    user: null,
    token: null,
    isBioEditMode: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any | null>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("accessToken");
        },
        setIsBioEditMode: (state) => {
            state.isBioEditMode = !state.isBioEditMode;
        },
        setToken: (state, action: PayloadAction<any | null>) => {
            state.token = action.payload;
        },
    },
});

export const { setUser, clearUser, setToken, setIsBioEditMode } = authSlice.actions;
export default authSlice.reducer;
