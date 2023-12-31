
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MainUrl } from '../GlobalRoutes';

export const userEmployerProfile = createApi({
    reducerPath: 'userEmployerProfile',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",

        credentials: "include",
    }),
    tagTypes: ['info', 'additionalInfo'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/employer/profile/personalinfo`,
            providesTags: ['info']
        }),
        updateProfile: builder.mutation({
            // ! need to change this [ adding separete apis ]
            query: (dataObj) => ({
                url: '/employer/profile/personalinfo',
                method: 'POST',
                body: dataObj,
            }),
            invalidatesTags: ['info']
        }),
        getAdditionalInfo: builder.query({
            query: () => `employer/profile/additionalinfo`,
            providesTags: ['additionalInfo']

        }),
        uploadFile: builder.mutation({
            query: (FormData) => ({
                url: '/employer/profile/fileupload',
                method: 'POST',
                body: FormData,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        deleteFile: builder.mutation({
            query: (id) => ({
                url: `/employer/profile/FileDelete/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        sendwhy: builder.mutation({
            query: (whydata) => ({
                url: `/employer/profile/why?`,
                method: 'POST',
                body: whydata,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        sendRecommend: builder.mutation({
            query: (recommend) => ({
                url: `/employer/profile/recommend`,
                method: 'POST',
                body: recommend,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        sendHeadQuarter: builder.mutation({
            query: (quarter) => ({
                url: `/employer/profile/headquarter`,
                method: 'POST',
                body: quarter,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        sendWebsite: builder.mutation({
            query: (website) => ({
                url: `/employer/profile/website`,
                method: 'POST',
                body: website,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        sendSocial: builder.mutation({
            query: (link) => ({
                url: `/employer/profile/addsocial`,
                method: 'POST',
                body: link,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        changSocailLink: builder.mutation({
            query: ({ id, link }) => ({
                url: `/employer/profile/editsocial/${id}`,
                method: 'PUT',
                body: link,
            }),
            invalidatesTags: ['additionalInfo']
        }),
        deletLink: builder.mutation({
            query: ({ id }) => ({
                url: `/employer/profile/deletesocial/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['additionalInfo']
        })

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetProfileQuery,
    useGetAdditionalInfoQuery,
    useUpdateProfileMutation,
    useUploadFileMutation,
    useDeleteFileMutation,
    useSendwhyMutation,
    useSendRecommendMutation,
    useSendHeadQuarterMutation,
    useSendWebsiteMutation,
    useSendSocialMutation,
    useChangSocailLinkMutation,
    useDeletLinkMutation,
} = userEmployerProfile;