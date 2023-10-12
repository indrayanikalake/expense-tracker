import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('token');

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


export const getLeaderboardData=()=>{
    
    return async(dispatch,getstate)=>{
        console.log(token);
      try {
        const response = await axios.get('http://localhost:7000/premium/showDashboard',{headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
        }})
        console.log(response.data.leaderboardofusers)
        dispatch(updateData(response.data.leaderboardofusers))
       
      } catch (error) {
        console.log(error)
        
      }
    }
}