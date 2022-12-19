import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authSlice from './authSlice';
import accountReducer from './accountSlice';
import appsReducer from './appsSlice';
import { identityApi, pceApi } from './api';

export const store = configureStore({
  middleware: (getDefault) =>
    getDefault().concat(
      identityApi.middleware,
      pceApi.middleware,
      ...(process.env.NODE_ENV === 'development' ? [logger] : [])
    ),
  reducer: {
    auth: authSlice,
    account: accountReducer,
    apps: appsReducer,
    [identityApi.reducerPath]: identityApi.reducer,
    [pceApi.reducerPath]: pceApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
