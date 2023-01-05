import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { GeneralInformation } from '../components/priv-config/general-information/GeneralInformationConfig';
import { dataCategories } from '../consts/data-categories';
import * as t from '../types';
// import { GeneralInformation } from '../components/priv-config/GeneralInformation';
import { pceApi } from './api';
import { RootState } from './store';

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
      [string, t.GeneralInformationPayload]
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
    getRequestResolution: builder.query<t.RequestResolution, string>({
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
    updateRequestResolution: builder.mutation<
      any,
      [string, t.RequestResolution]
    >({
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
    }),
    getPrivacyScopeDimenstions: builder.query<t.PrivacyScopeDimensions, string>(
      {
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
      }
    ),
    addSelectors: builder.mutation<any, [string, t.SelectorPayload[]]>({
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
    getLegalBases: builder.query<Array<t.LegalBaseLite>, string>({
      // query: (token) => ({
      //   url: 'configure/legal-bases',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        data: [
          {
            id: '320604a2-b8dc-4ac9-b446-db6ff30e91fb ',
            lb_type: 'CONTRACT',
            name: 'test contract',
            active: true,
          },
          {
            id: 'c4ca098d-0f2f-41f4-a6df-07c4b9ccf7a1',
            lb_type: 'CONSENT',
            name: 'test consent',
            description: 'this is a description of the test consent 1',
            active: true,
          },
          {
            id: 'd31dcc3b-3f6a-4786-85d2-5cfcea662008',
            lb_type: 'CONSENT',
            name: 'test consent 2',
            description:
              'this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2. this is a description of the test consent 2',
            active: false,
          },
        ],
      }),
      providesTags: ['legalBases'],
    }),
    getLegalBase: builder.query<t.LegalBase, [string, string]>({
      // query: ([token, lbId]) => ({
      //   url: `configure/legal-bases/${lbId}`,
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        data: {
          id: 'c4ca098d-0f2f-41f4-a6df-07c4b9ccf7a1',
          lb_type: 'CONSENT',
          name: 'test consent',
          description: 'description',
          active: true,
          scope: {
            triples: [
              {
                data_category: '',
                processing_category: '',
                purpose: '',
              },
            ],
          },
        },
      }),
      providesTags: ['legalBases'],
    }),
    createLegalBase: builder.mutation<string, [string, t.NewLegalBase]>({
      // query: ([token, body]) => ({
      //   url: `configure/legal-bases`,
      //   method: 'PUT',
      //   body,
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) =>
        new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
          data: 'c4ca098d-0f2f-41f4-a6df-07c4b9ccf7a1',
        })),
      invalidatesTags: ['legalBases'],
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
  useGetLegalBasesQuery,
  useCreateLegalBaseMutation,
  useGetLegalBaseQuery,
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

export const selectPrivSelectors = (token: string) =>
  createSelector(
    privConfigApiSlice.endpoints.getPrivacyScopeDimenstions.select(token),
    (res) =>
      res.data?.data_categories.filter((dc) => !dataCategories.includes(dc))
  );

export const selectNewPrivSelectors = (state: RootState) =>
  state.privConfig.newPrivSelectors;
