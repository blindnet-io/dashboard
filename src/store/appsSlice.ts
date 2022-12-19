import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { identityApi } from './api';
import { RootState } from './store';

export type Application = {
  id: string;
  name: string;
  key: string;
};

export type AppGroup = {
  id: string;
  name: string;
  key: string;
};

type AppsState = {
  activeGroup: string | null;
};

const initialState: AppsState = {
  activeGroup: null,
};

const appsApiSlice = identityApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppGroups: builder.query<Array<AppGroup>, void>({
      query: () => ({
        url: 'app-groups',
        method: 'GET',
      }),
      providesTags: ['groups'],
    }),
    getAppGroup: builder.query<AppGroup, string>({
      query: (id) => ({
        url: `app-groups/${id}`,
        method: 'GET',
      }),
      providesTags: ['groups'],
    }),
    getAppGroupApps: builder.query<Array<Application>, string>({
      query: (id) => ({
        url: `app-groups/${id}/applications`,
        method: 'GET',
      }),
      providesTags: ['groups', 'apps'],
    }),
    createAppGroup: builder.mutation<string, { name: string; key: string }>({
      query: ({ name, key }) => ({
        url: 'app-groups',
        method: 'POST',
        body: { name, key },
      }),
      invalidatesTags: ['groups'],
    }),
    updateAppGroup: builder.mutation<
      any,
      { id: string; name: string; key: string }
    >({
      query: ({ id, name, key }) => ({
        url: `app-groups/${id}`,
        method: 'POST',
        body: { name, key },
      }),
      invalidatesTags: ['groups'],
    }),
    deleteAppGroup: builder.mutation<any, string>({
      query: (id) => ({
        url: `app-groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['groups'],
    }),
    getApp: builder.query<Application, string>({
      query: (id) => ({
        url: `applications/${id}`,
        method: 'GET',
      }),
      providesTags: ['groups', 'apps'],
    }),
    createApp: builder.mutation<string, { group: string; name: string }>({
      query: ({ group, name }) => ({
        url: `applications`,
        method: 'POST',
        body: { group_id: group, name },
      }),
      invalidatesTags: ['apps'],
    }),
    updateApp: builder.mutation<string, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `applications`,
        method: 'POST',
        body: { id, name },
      }),
      invalidatesTags: ['apps'],
    }),
    deleteApp: builder.mutation<any, string>({
      query: (id) => ({
        url: `applications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['apps'],
    }),
  }),
});

export const {
  useGetAppGroupsQuery,
  useGetAppGroupQuery,
  useGetAppGroupAppsQuery,
  useCreateAppGroupMutation,
  useUpdateAppGroupMutation,
  useDeleteAppGroupMutation,
  useGetAppQuery,
  useCreateAppMutation,
  useUpdateAppMutation,
  useDeleteAppMutation,
} = appsApiSlice;

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    changeActiveGroup(state, action: PayloadAction<string>) {
      state.activeGroup = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { changeActiveGroup } = appsSlice.actions;

export const selectAppGroups = createSelector(
  appsApiSlice.endpoints.getAppGroups.select(undefined),
  (res) => res.data
);
export const selectAppGroup = (id: string) =>
  createSelector(
    appsApiSlice.endpoints.getAppGroup.select(id),
    (res) => res.data
  );
export const selectAppGroupApps = (id: string) =>
  createSelector(
    appsApiSlice.endpoints.getAppGroupApps.select(id),
    (res) => res.data
  );
export const selectApp = (id: string) =>
  createSelector(appsApiSlice.endpoints.getApp.select(id), (res) => res.data);

export const selectActiveGroup = createSelector(
  (state: RootState) => state.apps.activeGroup,
  selectAppGroups,
  (activeGroup, groups) => groups?.find((g) => g.id === activeGroup)
);

// export const selectApp = (token: string, id: string) => createSelector(
//   selectActiveGroup(token),
//   group => group?.applications.find(a => a.id === id)
// )

export default appsSlice.reducer;
