// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';

const store1 = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store1;
