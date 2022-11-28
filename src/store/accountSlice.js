import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'

const initialState = {}

const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInfo: builder.query({
      query: token => ({
        url: 'account',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      ransformResponse: (response, meta, arg) => response
    })
  })
})

export const { useGetInfoQuery } = accountApiSlice

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => { }
});

export const { } = accountSlice.actions

export const selectAccountInfoResult = token => accountApiSlice.endpoints.getInfo.select(token)
export const selectAccountInfo = (token) => createSelector(
  selectAccountInfoResult(token),
  (res) => res.data
)

export default accountSlice.reducer;
