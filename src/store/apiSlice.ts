import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URI}/v1` }),
  endpoints: _ => ({})
})

export const { } = apiSlice