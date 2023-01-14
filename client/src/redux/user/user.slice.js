import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";

const initialState = {
    isLogged: false,
    user: {},
    error: undefined,
    loading: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) =>{
            state.isLogged=false
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(login.pending, (state) =>{
            return {
                ...state, 
                loading: true
            };
        });

        builder.addCase(login.fulfilled, (state, action) =>{
            const { user } = action.payload;

            return {
                ...state,
                user,
                isLogged: true,
                loading: false, 
                error: undefined
            };
        });

        builder.addCase(login.rejected, (state, action) =>{
            const { error } = action.payload;

            return {
                ...state,
                error,
            };
        });
    }
});

export const { reducer: userReducer, actions } = userSlice;