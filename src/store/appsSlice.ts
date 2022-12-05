import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'
import { RootState } from './store';

export type Application = {
  id: string,
  name: string,
  description: string,
  active: boolean
}

export type AppGroup = {
  id: string,
  name: string,
  description: string,
  key: string,
  applications: Array<Application>
}

type AppsState = {
  activeGroup: string | null
}

const initialState: AppsState = {
  activeGroup: null
}

const appsApiSlice = apiSlice.injectEndpoints({
  // tagTypes: ['AppGroups'],
  endpoints: builder => ({
    getAppGroups: builder.query<Array<AppGroup>, any>({
      query: (token: string) => ({
        url: 'app-groups',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      // ransformResponse: (response, meta, arg) => response,
      // providesTags: ['AppGroups']
    }),
    getAppGroupInfo: builder.query<AppGroup, any>({
      query: ({ token, id }) => ({
        url: `app-groups/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      // ransformResponse: (response, meta, arg) => response,
      // providesTags: ['AppGroups']
    }),
    createAppGroup: builder.mutation<any, any>({
      query: ({ token, name, description, key }) => ({
        url: 'app-groups',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: { name, description, key }
      }),
      // invalidatesTags: ['AppGroups']
    }),
    createApp: builder.mutation<any, any>({
      query: ({ token, group, name, description }) => ({
        url: `app-groups/${group}/applications`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: { name, group, description }
      }),
      // invalidatesTags: ['AppGroups']
    })
  })
})

export const {
  useGetAppGroupsQuery,
  useGetAppGroupInfoQuery,
  useCreateAppGroupMutation,
  useCreateAppMutation
} = appsApiSlice

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    changeActiveGroup(state, action) {
      state.activeGroup = action.payload
    }
  },
  extraReducers: (builder) => { }
});

export const { changeActiveGroup } = appsSlice.actions

export const selectAppGroupsResult = (token: string) => appsApiSlice.endpoints.getAppGroups.select(token)
export const selectAppGroups = (token: string) => createSelector(
  selectAppGroupsResult(token),
  res => res.data
)

export const selectActiveGroup = (token: string) => createSelector(
  (state: RootState) => state,
  selectAppGroups(token),
  (state, groups) => groups?.find(g => g.id == state.apps.activeGroup)
)

export const selectApp = (token: string, id: string) => createSelector(
  selectActiveGroup(token),
  group => group?.applications.find(a => a.id == id)
)

export default appsSlice.reducer;
