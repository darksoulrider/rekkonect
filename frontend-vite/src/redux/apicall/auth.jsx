
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({

    baseUrl: 'http://localhost:5000/api',
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data,

      })
    }),
    logout: builder.query({
      query: () => "/logout",
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLazyLogoutQuery } = Authentication