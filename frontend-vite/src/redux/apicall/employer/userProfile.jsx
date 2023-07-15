
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MainUrl } from '../GlobalRoutes';

export const userEmployerProfile = createApi({
    reducerPath: 'userEmployerProfile',
    baseQuery: fetchBaseQuery({ baseUrl: MainUrl }),
    tagTypes: ['info', 'additionalInfo'],
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
        getAdditionalInfo: builder.query(),
        uploadFile: builder.mutation({
            query: (FormData) => ({
                url: '/employer/profile/fileupload',
                method: 'POST',
                body: FormData,
            }),
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadFileMutation,

} = userEmployerProfile;