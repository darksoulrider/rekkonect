
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MainUrl } from '../GlobalRoutes';

export const userEmployerProfile = createApi({
    reducerPath: 'userEmployerProfile',
    baseQuery: fetchBaseQuery({ baseUrl: MainUrl }),
    tagTypes: ['info'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/employer/profile/personalinfo`,
            providesTags: ['info']
        }),
        updateProfile: builder.mutation({
            query: (dataObj) => ({
                url: '/employer/profile/personalinfo',
                method: 'POST',
                body: dataObj,
            }),
            invalidatesTags: ['info']
        }),
        UserData: builder.query({
            query: () => `/test`
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUserDataQuery
} = userEmployerProfile;