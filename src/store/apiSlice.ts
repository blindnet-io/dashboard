import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URI}/api` }),
  endpoints: builder => ({})
})

export const { } = apiSlice