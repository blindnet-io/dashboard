import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'
import { RootState } from './store';

export type Application = {
  id: string,
  name: string,
  key: string
}

export type AppGroup = {
  id: string,
  name: string,
  key: string
}

type AppsState = {
  activeGroup: string | null
}

const initialState: AppsState = {
  activeGroup: null
}

const appsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['groups', 'apps'] })
  .injectEndpoints({
    endpoints: builder => ({
      getAppGroups: builder.query<Array<AppGroup>, string>({
        query: (token: string) => ({
          url: 'app-groups',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        // ransformResponse: (response, meta, arg) => response,
        providesTags: ['groups']
      }),
      getAppGroup: builder.query<AppGroup, { token: string, id: string }>({
        query: ({ token, id }) => ({
          url: `app-groups/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        providesTags: ['groups']
      }),
      getAppGroupApps: builder.query<Array<Application>, { token: string, id: string }>({
        query: ({ token, id }) => ({
          url: `app-groups/${id}/applications`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        providesTags: ['groups', 'apps']
      }),
      createAppGroup: builder.mutation<string, { token: string, name: string, key: string }>({
        query: ({ token, name, key }) => ({
          url: 'app-groups',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: { name, key }
        }),
        invalidatesTags: ['groups']
      }),
      updateAppGroup: builder.mutation<any, { token: string, id: string, name: string, key: string }>({
        query: ({ token, id, name, key }) => ({
          url: `app-groups/${id}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: { name, key }
        })
      }),
      deleteAppGroup: builder.mutation<any, { token: string, id: string }>({
        query: ({ token, id }) => ({
          url: `app-groups/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        invalidatesTags: ['groups']
      }),
      getApp: builder.query<Application, { token: string, id: string }>({
        query: ({ token, id }) => ({
          url: `applications/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        providesTags: ['groups', 'apps']
      }),
      createApp: builder.mutation<string, { token: string, group: string, name: string }>({
        query: ({ token, group, name }) => ({
          url: `applications`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: { group_id: group, name }
        }),
        invalidatesTags: ['apps']
      }),
      updateApp: builder.mutation<string, { token: string, name: string }>({
        query: ({ token, name }) => ({
          url: `applications`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: { name }
        }),
        invalidatesTags: ['apps']
      }),
      deleteApp: builder.mutation<any, { token: string, id: string }>({
        query: ({ token, id }) => ({
          url: `applications/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        invalidatesTags: ['apps']
      }),
    })
  })

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
} = appsApiSlice

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    changeActiveGroup(state, action: PayloadAction<string>) {
      state.activeGroup = action.payload
    }
  },
  extraReducers: (builder) => { }
});

export const { changeActiveGroup } = appsSlice.actions

export const selectAppGroups = (token: string) => createSelector(
  appsApiSlice.endpoints.getAppGroups.select(token),
  res => res.data
)
export const selectAppGroup = (token: string, id: string) => createSelector(
  appsApiSlice.endpoints.getAppGroup.select({ token, id }),
  res => res.data
)
export const selectAppGroupApps = (token: string, id: string) => createSelector(
  appsApiSlice.endpoints.getAppGroupApps.select({ token, id }),
  res => res.data
)
export const selectApp = (token: string, id: string) => createSelector(
  appsApiSlice.endpoints.getApp.select({ token, id }),
  res => res.data
)

export const selectActiveGroup = (token: string) => createSelector(
  (state: RootState) => state.apps.activeGroup,
  selectAppGroups(token),
  (activeGroup, groups) => groups?.find(g => g.id === activeGroup)
)

// export const selectApp = (token: string, id: string) => createSelector(
//   selectActiveGroup(token),
//   group => group?.applications.find(a => a.id === id)
// )

export default appsSlice.reducer;
