import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authSlice from './authSlice';
import accountReducer from './accountSlice';
import appsReducer from './appsSlice';
import { api } from './api';

export const store = configureStore({
  middleware: (getDefault) =>
    getDefault().concat(
      api.middleware,
      ...(process.env.NODE_ENV === 'development' ? [logger] : [])
    ),
  reducer: {
    auth: authSlice,
    account: accountReducer,
    apps: appsReducer,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
