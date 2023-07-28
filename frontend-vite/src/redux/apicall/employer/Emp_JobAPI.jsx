
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MainUrl } from '../GlobalRoutes';

export const Emp_JobAPI = createApi({
    reducerPath: 'jobs',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        credentials: "include",
    }),
    tagTypes: ['JOBS'],

    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => `/employer/jobs`,
            tagTypes: ['JOBS']
        }),
        getSingleJob: builder.query({
            query: (id) => `/employer/jobs/${id}`,
            tagTypes: ['JOBS']
        }),
        updateSingleJob: builder.mutation({
            query: ({ id, data }) => ({
                url: `/employer/jobs/${id}`,
                method: 'PUT',
                body: data,
            }),
            tagTypes: ['JOBS']
        }),
        postJob: builder.mutation({
            query: (dataObj) => ({
                url: '/employer/jobs/create',
                method: 'POST',
                body: dataObj,
            }),
            invalidatesTags: ['JOBS']
        }),

        deletLink: builder.mutation({
            query: ({ id }) => ({
                url: `/employer/profile/deletesocial/${id}`,
                method: 'DELETE',

            }),
        })

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllJobsQuery,
    useGetSingleJobQuery,
    usePostJobMutation,
    useUpdateSingleJobMutation,
} = Emp_JobAPI;