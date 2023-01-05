// import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
// import * as t from '../types';
// import { GeneralInformation } from '../components/priv-config/GeneralInformation';
import { storageApi } from './api';

const storageConfigSlice = storageApi.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.query<string, string>({
      // query: (token) => ({
      //   url: 'configuration/token',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({ data: 'token' }),
      providesTags: ['apiToken'],
    }),
    resetToken: builder.mutation<string, string>({
      // query: (token) => ({
      //   url: `configuration/token/reset`,
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) =>
        new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
          data: 'new_token',
        })),
      invalidatesTags: ['apiToken'],
    }),
  }),
});

export const { useGetTokenQuery, useResetTokenMutation } = storageConfigSlice;

// type State = {
//   newPrivSelectors: Array<PrivSelector>;
// };

// const initialState: State = {
//   newPrivSelectors: [],
// };

// export const privConfigSlice = createSlice({
//   name: 'privConfig',
//   initialState,
//   reducers: {
//     addSelector(state, action: PayloadAction<PrivSelector>) {
//       if (
//         state.newPrivSelectors.find(
//           (s) =>
//             s.name === action.payload.name &&
//             s.dataCategory === action.payload.dataCategory
//         ) === undefined
//       )
//         state.newPrivSelectors.push(action.payload);
//     },
//     removeSelector(state, action: PayloadAction<PrivSelector>) {
//       state.newPrivSelectors = state.newPrivSelectors.filter(
//         (s) =>
//           !(
//             s.name === action.payload.name &&
//             s.dataCategory === action.payload.dataCategory
//           )
//       );
//     },
//     removeAllSelectors(state, action: PayloadAction<void>) {
//       state.newPrivSelectors = [];
//     },
//   },
//   extraReducers: (builder) => { },
// });

// export const { addSelector, removeSelector, removeAllSelectors } =
//   privConfigSlice.actions;

// export const selectPrivSelectors = (token: string) =>
//   createSelector(
//     storageConfigSlice.endpoints.getPrivacyScopeDimenstions.select(token),
//     (res) =>
//       res.data?.data_categories.filter((dc) => !dataCategories.includes(dc))
//   );

// export const selectNewPrivSelectors = (state: RootState) =>
//   state.privConfig.newPrivSelectors;
