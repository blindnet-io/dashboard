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
      query: (token) => ({
        url: 'configure/general-info',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (
        response: t.GeneralInformationPayload,
        meta,
        arg
      ): GeneralInformation => {
        return {
          ...response,
          dataConsumerCategories: response.data_consumer_categories,
          privacyPolicyLink: response.privacy_policy_link,
          dataSecurityInfo: response.data_security_info,
        };
      },
      providesTags: ['generalInformation'],
    }),
    updateGeneralInformation: builder.mutation<
      any,
      [string, GeneralInformation]
    >({
      query: ([token, body]) => ({
        url: `configure/general-info`,
        method: 'PUT',
        body: {
          organization: body.organization,
          dpo: body.dpo,
          privacy_policy_link: body.privacyPolicyLink,
          data_security_info: body.dataSecurityInfo,
          data_consumer_categories:
            body.dataConsumerCategories &&
            body.dataConsumerCategories.length > 0
              ? body.dataConsumerCategories.split(',')
              : [],
          countries:
            body.countries && body.countries.length > 0
              ? body.countries.split(',')
              : [],
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['generalInformation'],
    }),
    getRequestResolution: builder.query<t.RequestResolution, string>({
      query: (token) => ({
        url: 'configure/demand-resolution-strategy',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['requestResolution'],
    }),
    updateRequestResolution: builder.mutation<
      any,
      [string, t.RequestResolution]
    >({
      query: ([token, body]) => ({
        url: `configure/demand-resolution-strategy`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['requestResolution'],
    }),
    getPrivacyScopeDimenstions: builder.query<t.PrivacyScopeDimensions, string>(
      {
        query: (token) => ({
          url: 'configure/privacy-scope-dimensions',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: ['psDimensions'],
      }
    ),
    getSelectors: builder.query<Array<string>, string>({
      query: (token) => ({
        url: 'configure/selectors',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['psDimensions'],
    }),
    addSelectors: builder.mutation<any, [string, t.SelectorPayload[]]>({
      query: ([token, body]) => ({
        url: `configure/selectors`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['psDimensions'],
    }),
    getLegalBases: builder.query<Array<t.LegalBaseLite>, string>({
      query: (token) => ({
        url: 'configure/legal-bases',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['legalBases'],
    }),
    getLegalBase: builder.query<t.LegalBase, [string, string]>({
      query: ([token, lbId]) => ({
        url: `configure/legal-bases/${lbId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['legalBases'],
    }),
    createLegalBase: builder.mutation<string, [string, t.NewLegalBase]>({
      query: ([token, body]) => ({
        url: `configure/legal-bases`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['legalBases'],
    }),
    getStorageConfig: builder.query<t.StorageConfiguration, string>({
      query: (token) => ({
        url: `configure/storage`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['storage'],
    }),
    updateStorageConfig: builder.mutation<
      any,
      [string, t.UpdateStorageConfigurationPayload]
    >({
      query: ([token, body]) => ({
        url: `configure/storage`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['storage'],
    }),
  }),
});

export const {
  useGetGeneralInformationQuery,
  useUpdateGeneralInformationMutation,
  useGetRequestResolutionQuery,
  useUpdateRequestResolutionMutation,
  useGetPrivacyScopeDimenstionsQuery,
  useGetSelectorsQuery,
  useAddSelectorsMutation,
  useGetLegalBasesQuery,
  useCreateLegalBaseMutation,
  useGetLegalBaseQuery,
  useGetStorageConfigQuery,
  useUpdateStorageConfigMutation,
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
