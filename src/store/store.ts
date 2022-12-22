import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { accountSlice } from './accountSlice';
import { identityApi, pceApi } from './api';
import { appsSlice } from './appsSlice';
import { authSlice } from './authSlice';
import { privConfigSlice } from './privConfigSlice';

export const store = configureStore({
  middleware: (getDefault) =>
    getDefault().concat(
      identityApi.middleware,
      pceApi.middleware,
      ...(process.env.NODE_ENV === 'development' ? [logger] : [])
    ),
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    apps: appsSlice.reducer,
    privConfig: privConfigSlice.reducer,
    [identityApi.reducerPath]: identityApi.reducer,
    [pceApi.reducerPath]: pceApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
