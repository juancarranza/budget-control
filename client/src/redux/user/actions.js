import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk('user/login', async(userInfo) =>{
    const response= await axios.post('http://localhost:3001/api/budget-control/v1/user', {userInfo});
    return response;
});