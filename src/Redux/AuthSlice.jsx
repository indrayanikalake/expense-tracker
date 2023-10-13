import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuthenticated: false,
        token:null,
        userId:null,
    },
    reducers:{
        login(state, action){
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout(state, action){
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
        },
    }
})

export const { login, logout } = authSlice.actions;
const authReducer =authSlice.reducer;
export default authReducer;

 export const resetPassword = (email,password, uuid) =>{
    return async(dispatch, getState)=>{
        try{
            const response = await axios.post('http://localhost:7000/password/resetPassword/${uuid}',{emai:email, password:pawword})
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }
}