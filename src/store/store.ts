import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authSlice from './authSlice';
import accountReducer from './accountSlice';
import appsReducer from './appsSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  middleware: (getDefault) =>
    getDefault().concat(
      apiSlice.middleware,
      ...(process.env.NODE_ENV === 'development' ? [logger] : [])
    ),
  reducer: {
    auth: authSlice,
    account: accountReducer,
    apps: appsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
