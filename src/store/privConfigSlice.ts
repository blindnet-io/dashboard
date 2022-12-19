// import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
// import { GeneralInformation } from '../components/priv-config/GeneralInformation';
import { RequestResolution } from '../components/priv-config/RequestResolutionForm';
import { GeneralInformation } from '../components/priv-config/GeneralInformationForm';
import { pceApi } from './api';
// import { RootState } from './store';

type GeneralInformationPayload = {
  organization: string;
  dpo: string;
  data_consumer_categories?: Array<string>;
  countries?: Array<string>;
  privacy_policy_link?: string;
  data_security_info?: string;
};

const privConfigApiSlice = pceApi.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralInformation: builder.query<GeneralInformation, string>({
      // query: (token) => ({
      //   url: 'configure/general-info',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      // transformResponse: (response: GeneralInformationPayload, meta, arg): GeneralInformation => ({
      //   ...response,
      //   dataConsumerCategories: response.data_consumer_categories,
      //   privacyPolicyLink: response.privacy_policy_link,
      //   dataSecurityInfo: response.data_security_info
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        data: {
          organization: 'org',
          dpo: 'dpo',
          dataConsumerCategories: ['c1', 'c2'],
          countries: ['France', 'USA'],
          privacyPolicyLink: 'https://blindnet.io',
          dataSecurityInfo: undefined,
        },
      }),
      providesTags: ['generalInformation'],
    }),
    updateGeneralInformation: builder.mutation<
      any,
      [string, GeneralInformationPayload]
    >({
      // query: ([token, body]) => ({
      //   url: `configure/general-info`,
      //   method: 'PUT',
      //   body,
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) =>
        new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
          data: undefined,
        })),
      invalidatesTags: ['generalInformation'],
    }),
    getRequestResolution: builder.query<RequestResolution, string>({
      // query: (token) => ({
      //   url: 'configure/demand-resolution-strategy',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        data: {
          transparency: 'auto',
          access: 'auto',
          delete: 'auto',
          revoke_consent: 'manual',
          object_scope: 'manual',
          restrict_scope: 'manual',
        },
      }),
      providesTags: ['requestResolution'],
    }),
    updateRequestResolution: builder.mutation<any, [string, RequestResolution]>(
      {
        // query: ([token, body]) => ({
        //   url: `configure/demand-resolution-strategy`,
        //   method: 'PUT',
        //   body,
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // }),
        queryFn: (arg, queryApi, extraOptions, baseQuery) =>
          new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
            data: undefined,
          })),
        invalidatesTags: ['requestResolution'],
      }
    ),
  }),
});

export const {
  useGetGeneralInformationQuery,
  useUpdateGeneralInformationMutation,
  useGetRequestResolutionQuery,
  useUpdateRequestResolutionMutation,
} = privConfigApiSlice;
