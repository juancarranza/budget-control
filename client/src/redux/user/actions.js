import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk('user/login', async(loginCredentials) =>{
    const response= await axios.post('http://localhost:3001/api/budget-control/user/login', {loginCredentials});
    const data = response.data;
    console.log("data");
    console.log(data);
    return {
        user: data
    };
});