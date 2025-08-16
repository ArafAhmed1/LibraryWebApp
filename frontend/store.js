import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './src/slices/apiSlice';
import authReducer from './src/slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
