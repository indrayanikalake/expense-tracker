import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const expenseSlice = createSlice({
    name:'expenses',
    initialState:{
        expenses: [],
        url: null,
        updated: {}
    },
    reducers:{
        setExpenses(state, action){
            state.expenses = action.payload;
        },
        addExpenses(state, action){
           Object.keys(state.expenses).push(action.payload);
        },
        deleteExpenses(state, action){
          state.expenses = Object.keys(state.expenses).filter((expense) =>expense.id !== action.payload);
        },
        editExpense(state, action){
            const { id, updatedExpense } = action.payload;
            const index = Object.keys(state.expenses).findIndex((expense) => expense.id === id);
            if(index!== -1){
                state.expenses[index] = updatedExpense;
            }
        },
        setUrl(state, action){
            state.url= action.payload;
        },
        setUpdated(state,action){
            state.updated = action.payload
        }
    }

})

export const { setExpenses, addExpenses, deleteExpenses, editExpense, setUrl, setUpdated } = expenseSlice.actions;
const expenseReducer = expenseSlice.reducer;
export default expenseReducer;


export const dowloadExpense = () =>{
      return async (dispatch, getState)=>{
        const token = localStorage.getItem("token");

        const config={
            headers:{
                Authorization : `Bearer ${token}`
            }
        }

        try{
         const response =    await axios.get('http://localhost:7000/downloadexpense', config);
             dispatch(setUrl(response.data.url))

        }catch(error){
            console.log(error);
        }
      }
}
