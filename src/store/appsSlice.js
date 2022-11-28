import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'

const initialState = {
  activeGroup: null
}

const appsApiSlice = apiSlice.injectEndpoints({
  // tagTypes: ['AppGroups'],
  endpoints: builder => ({
    getAppGroups: builder.query({
      query: token => ({
        url: 'app-groups',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      ransformResponse: (response, meta, arg) => response,
      // providesTags: ['AppGroups']
    }),
    getAppGroupInfo: builder.query({
      query: ({ token, id }) => ({
        url: `app-groups/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      ransformResponse: (response, meta, arg) => response,
      // providesTags: ['AppGroups']
    }),
    createAppGroup: builder.mutation({
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
    createApp: builder.mutation({
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

export const selectAppGroupsResult = token => appsApiSlice.endpoints.getAppGroups.select(token)
export const selectAppGroups = token => createSelector(
  selectAppGroupsResult(token),
  res => res.data
)

export const selectActiveGroup = token => createSelector(
  state => state,
  selectAppGroups(token),
  (state, groups) => groups?.find(g => g.id == state.apps.activeGroup)
)

export default appsSlice.reducer;
