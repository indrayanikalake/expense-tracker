import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:'expenses',
    initialState:{
        expenses: [],
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
        }
    }

})

export const { setExpenses, addExpenses, deleteExpenses, editExpense } = expenseSlice.actions;
const expenseReducer = expenseSlice.reducer;
export default expenseReducer;

