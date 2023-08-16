
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userMentor = createApi({
    reducerPath: 'userMentor',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        credentials: "include",
    }),
    tagTypes: ['dashboard'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/employer/profile/personalinfo`,
            providesTags: ['info']
        }),
        updateAddressAndName: builder.mutation({
            // ! need to change this [ adding separete apis ]
            query: (dataObj) => ({
                url: 'mentor/address',
                method: 'PUT',
                body: dataObj,
            }),
            invalidatesTags: ['dashboard']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUpdateAddressAndNameMutation,

} = userMentor;