// store.js

import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './ExpenseSlice';
import authReducer from './AuthSlice';
import themeReducer from './ThemeSlice';
import cartReducer from './CartSlice';
import cartStatusReducer from './CartStatus';
import paymentSliceReducer from './PaymentSlice';
import leaderBoardSlicereducer from './LeaderboardSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer,
    cart:cartReducer,
    cartStatus: cartStatusReducer,
    payment: paymentSliceReducer,
    leaderboard:leaderBoardSlicereducer
  },
});

export default store;
