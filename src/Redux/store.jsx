// store.js

import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './ExpenseSlice';
import authReducer from './AuthSlice';
import themeReducer from './ThemeSlice';
import cartReducer from './CartSlice';
import cartStatusReducer from './CartStatus';


const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer,
    cart:cartReducer,
    cartStatus: cartStatusReducer,
  },
});

export default store;
