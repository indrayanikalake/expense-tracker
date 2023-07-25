import { createSlice } from "@reduxjs/toolkit";

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