import { createSlice } from '@reduxjs/toolkit';
import { identityApi } from './api';
import { RootState } from './store';

type AuthState = {
  authenticated: boolean;
  token: string | null;
};

const initialState: AuthState = {
  authenticated: false,
  token: localStorage.getItem('token') || null,
};

type Status = { verified: boolean };
type AuthArgs = { email: string; password: string };
type LoginResult = { token: string; status: Status };

const authApiSlice = identityApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, AuthArgs>({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation<LoginResult, AuthArgs>({
      query: ({ email, password }) => ({
        url: 'auth/register',
        method: 'POST',
        body: { email, password },
      }),
    }),
    status: builder.query<Status, any>({
      query: () => ({
        url: 'auth/status',
        method: 'GET',
      }),
      providesTags: ['status'],
    }),
    verifyToken: builder.mutation<any, string>({
      query: (emailToken: string) => ({
        url: 'auth/verify',
        method: 'POST',
        body: { token: emailToken },
      }),
      invalidatesTags: ['status'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useStatusQuery,
  useVerifyTokenMutation,
} = authApiSlice;

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action) => {
          state.authenticated = true;
          state.token = action.payload.token;
        }
      )
      .addMatcher(
        authApiSlice.endpoints.register.matchFulfilled,
        (state, action) => {
          state.authenticated = true;
          state.token = action.payload.token;
        }
      )
      .addMatcher(
        authApiSlice.endpoints.verifyToken.matchFulfilled,
        (state, action) => {
          if (state.token) {
            state.authenticated = true;
          }
        }
      )
      .addMatcher(
        authApiSlice.endpoints.status.matchFulfilled,
        (state, action) => {
          state.authenticated = true;
        }
      );
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

// export const {  } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;
