// store.js

import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './ExpenseSlice';
import authReducer from './AuthSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
});

export default store;
