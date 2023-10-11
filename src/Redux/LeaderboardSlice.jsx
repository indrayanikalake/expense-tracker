import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token");


const leaderBoardSlice = createSlice({
    name:'leaderboard',
    initialState:{
        data:[],
    },
    reducers:{
        updateData(state,action){
            state.data = action.payload;
        }
    }
})

export const {updateData} = leaderBoardSlice.actions;
const leaderBoardSlicereducer = leaderBoardSlice.reducer;
export default leaderBoardSlicereducer;


export const getLeaderboardData = () =>{
    console.log('hi')
    const config={
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    return async (dispatch, getState)=>{
        try{
         const response = await axios.get('http://localhost:7000/premium/showDashboard',config);
         console.log('done');
         console.log(response);
         dispatch(updateData(response.data.leaderboardofusers));
        }catch(error){
            throw new Error(error);
        }
    }
}