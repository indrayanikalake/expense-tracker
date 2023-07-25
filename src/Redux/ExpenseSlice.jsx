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
           state.expenses.push(action.payload);
        },
        deleteExpenses(state, action){
          state.expenses = state.expenses.filter((expense) =>expense.id !== action.payload);
        },
        editExpense(state, action){
            const { id, updatedExpense } = action.payload;
            const index = state.expenses.findIndex((expense) => expense.id === id);
            if(index!== -1){
                state.expenses[index] = updatedExpense;
            }
        }
    }

})

const { setExpenses, addExpenses, deleteExpenses, editExpense } = expenseSlice.actions;
const expenseReducer = expenseSlice.reducer;
export default expenseReducer;