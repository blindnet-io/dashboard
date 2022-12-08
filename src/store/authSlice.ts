import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'
import { RootState } from './store';

type AuthState = {
  authenticated: boolean
  token: string | null,
  // status: Status | null
}

const initialState: AuthState = {
  authenticated: false,
  token: localStorage.getItem('token') || null,
  // status: null
}

type Status = { verified: boolean }
type AuthArgs = { email: string, password: string }
type LoginResult = { token: string, status: Status }

const authApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['status'] })
  .injectEndpoints({
    endpoints: builder => ({
      login: builder.mutation<LoginResult, AuthArgs>({
        query: ({ email, password }) => ({
          url: 'auth/login',
          method: 'POST',
          body: { email, password }
        })
      }),
      register: builder.mutation<LoginResult, AuthArgs>({
        query: ({ email, password }) => ({
          url: 'auth/register',
          method: 'POST',
          body: { email, password }
        })
      }),
      status: builder.query<Status, string>({
        query: (token) => ({
          url: 'auth/status',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        providesTags: ['status']
      }),
      verifyToken: builder.mutation({
        query: (token: string) => ({
          url: 'auth/verify',
          method: 'POST',
          body: { token },
        }),
        invalidatesTags: ['status']
      })
    })
  })

export const {
  useLoginMutation,
  useRegisterMutation,
  useStatusQuery,
  useVerifyTokenMutation
} = authApiSlice

// import { str2bin, bin2b64str } from '../util/conversions';
// export const submit = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { getState, rejectWithValue }) => {
//     const hashedPass = await crypto.subtle.digest('SHA-256', str2bin(password)).then(bin2b64str)

//     const response = await new Promise((resolve) =>
//       setTimeout(() => {
//         localStorage.setItem("token", "token_123")
//         resolve({ status: 200 })
//       }, 500)
//     )

//     return response;
//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<{ token: string }>) {
      state.authenticated = true
      state.token = action.payload.token
    },
    // authenticate(state, action: PayloadAction<{ token: string, status: Status }>) {
    //   state.authenticated = true
    //   state.token = action.payload.token
    //   state.status = action.payload.status
    // },
    // updateStatus(state, action: PayloadAction<Status>) {
    //   state.status = action.payload
    // }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(submit.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(submit.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.success = true;
    //   })
    //   .addCase(submit.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = 'Submission failed'
    //   })
  },
});

export const { authenticate } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
// export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
