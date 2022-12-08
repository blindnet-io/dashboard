import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

type AccountState = {};

const initialState: AccountState = {};

const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query<{}, any>({
      query: (token) => ({
        url: 'account',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // ransformResponse: (response, meta, arg) => response
    }),
  }),
});

export const { useGetInfoQuery } = accountApiSlice;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const { } = accountSlice.actions

export const selectAccountInfoResult = (token: string) =>
  accountApiSlice.endpoints.getInfo.select(token);
export const selectAccountInfo = (token: string) =>
  createSelector(selectAccountInfoResult(token), (res) => res.data);

export default accountSlice.reducer;
