import { createSlice, createSelector } from '@reduxjs/toolkit';
import { identityApi } from './api';

type AccountState = {};

const initialState: AccountState = {};

const accountApiSlice = identityApi.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query<{}, any>({
      query: () => ({
        url: 'account',
        method: 'GET',
      }),
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

export const selectAccountInfo = (token: string) =>
  createSelector(
    accountApiSlice.endpoints.getInfo.select(undefined),
    (res) => res.data
  );
