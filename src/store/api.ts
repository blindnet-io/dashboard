import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const identityApi = createApi({
  reducerPath: 'identityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URI}/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['groups', 'apps', 'status'],
  endpoints: (_) => ({}),
});

export const pceApi = createApi({
  reducerPath: 'pceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_PCE_API_URI}/v0`,
  }),
  tagTypes: [
    'generalInformation',
    'requestResolution',
    'psDimensions',
    'legalBases',
  ],
  endpoints: (_) => ({}),
});
