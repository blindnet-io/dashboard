import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
// import { GeneralInformation } from '../components/priv-config/GeneralInformation';
import { RequestResolution } from '../components/priv-config/RequestResolutionForm';
import { GeneralInformation } from '../components/priv-config/GeneralInformationForm';
import { pceApi } from './api';
import { dataCategories } from './consts/data-categories';
import { RootState } from './store';
// import { RootState } from './store';

type GeneralInformationPayload = {
  organization: string;
  dpo: string;
  data_consumer_categories?: Array<string>;
  countries?: Array<string>;
  privacy_policy_link?: string;
  data_security_info?: string;
};

type PrivacyScopeDimensions = {
  data_categories: Array<string>;
  processing_categories: Array<string>;
  purposes: Array<string>;
};

type SelectorPayload = {
  name: string;
  data_category: string;
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
    getPrivacyScopeDimenstions: builder.query<PrivacyScopeDimensions, string>({
      // query: (token) => ({
      //   url: 'configure/privacy-scope-dimensions',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        data: {
          data_categories: ['AFFILIATION', 'AFFILIATION.dc_2', 'dc_3'],
          processing_categories: ['pc_1', 'pc_3', 'pc_3'],
          purposes: ['pp_1', 'pp_3', 'pp_3'],
        },
      }),
      providesTags: ['psDimensions'],
    }),
    addSelectors: builder.mutation<any, [string, SelectorPayload[]]>({
      // query: ([token, body]) => ({
      //   url: `configure/selectors`,
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
      invalidatesTags: ['psDimensions'],
    }),
  }),
});

export const {
  useGetGeneralInformationQuery,
  useUpdateGeneralInformationMutation,
  useGetRequestResolutionQuery,
  useUpdateRequestResolutionMutation,
  useGetPrivacyScopeDimenstionsQuery,
  useAddSelectorsMutation,
} = privConfigApiSlice;

export type PrivSelector = {
  name: string;
  dataCategory: string;
};

type State = {
  newPrivSelectors: Array<PrivSelector>;
};

const initialState: State = {
  newPrivSelectors: [],
};

export const privConfigSlice = createSlice({
  name: 'privConfig',
  initialState,
  reducers: {
    addSelector(state, action: PayloadAction<PrivSelector>) {
      if (
        state.newPrivSelectors.find(
          (s) =>
            s.name === action.payload.name &&
            s.dataCategory === action.payload.dataCategory
        ) === undefined
      )
        state.newPrivSelectors.push(action.payload);
    },
    removeSelector(state, action: PayloadAction<PrivSelector>) {
      state.newPrivSelectors = state.newPrivSelectors.filter(
        (s) =>
          !(
            s.name === action.payload.name &&
            s.dataCategory === action.payload.dataCategory
          )
      );
    },
    removeAllSelectors(state, action: PayloadAction<void>) {
      state.newPrivSelectors = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { addSelector, removeSelector, removeAllSelectors } =
  privConfigSlice.actions;

export const selectors = (token: string) =>
  createSelector(
    privConfigApiSlice.endpoints.getPrivacyScopeDimenstions.select(token),
    (res) =>
      res.data?.data_categories.filter((dc) => !dataCategories.includes(dc))
  );

export const newPrivSelectorsSelector = (state: RootState) =>
  state.privConfig.newPrivSelectors;
