import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";

const token = localStorage.getItem('budget_token');

const initialState = {
    isLogged: token? true:false,
    user: {},
    error: undefined,
    loading: false,
    token: token ? token: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) =>{
            state.isLogged=false;
            localStorage.removeItem("budget_token");
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
            const { user, token } = action.payload;

            console.log("usuario: ");
            console.log(user);
            localStorage.setItem("budget_token", token);
            return {
                ...state,
                user,
                token,
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