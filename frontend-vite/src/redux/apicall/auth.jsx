
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MainUrl } from './GlobalRoutes'

export const Authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: MainUrl,

  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = Authentication