import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'

const initialState = {
  token: localStorage.getItem('token') || null,
  authenticated: false
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        body: { username, password }
      })
    }),
    register: builder.mutation({
      query: ({ username, password }) => ({
        url: 'register',
        method: 'POST',
        body: { username, password }
      })
    }),
    verifyToken: builder.query({
      query: token => ({
        url: 'verify',
        method: 'POST',
        body: { token },
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery
} = authApiSlice

// import { str2bin, bin2b64str } from '../util/conversions';
// export const submit = createAsyncThunk(
//   'auth/login',
//   async ({ username, password }, { getState, rejectWithValue }) => {
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
    authenticate(state, action) {
      state.token = action.payload
      state.authenticated = true
    }
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

export const selectToken = state => state.auth.token;

export default authSlice.reducer;
