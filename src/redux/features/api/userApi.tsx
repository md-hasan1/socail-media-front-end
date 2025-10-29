/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "./baseApi";



const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserById: build.query({
            query: (data) => {
                return {
                    url: `/users/user/${data}`,
                    method: "GET",
                }
            },
            providesTags: [ "me" ]
        }),
        updateProfileImage: build.mutation({
            query: (data) => {
                return {
                    url: `/users/profile-image`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: [ "me" ]
        }),
        updateBannerImage: build.mutation({
            query: (data) => {
                return {
                    url: `/users/banner-image`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: [ "me" ]
        }),
        updateUserInfo: build.mutation({
            query: (data) => {
                return {
                    url: `/users/profile`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: [ "me" ]
        }),



        getAllAwards: build.query({
            query: (id) => {
                return {
                    url: `/awards/${id}`,
                    method: "GET",
                }
            },
            providesTags: [ "awards" ]
        }),
        addAward: build.mutation({
            query: (data) => {
                return {
                    url: `/awards/create`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: [ "awards" ]
        }),
        editAward: build.mutation({
            query: (data) => {
                return {
                    url: `/awards/${data?.id}`,
                    method: "PUT",
                    body: {
                        title: data.title,
                        givenBy: data.givenBy,
                        description: data.description
                    }
                }
            },
            invalidatesTags: [ "awards" ]
        }),
        deleteAward: build.mutation({
            query: (id) => {
                // console.log({ id })
                return {
                    url: `/awards/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: [ "awards" ]
        }),


        getAllEducations: build.query({
            query: (id) => {
                return {
                    url: `/education/${id}`,
                    method: "GET",
                }
            },
            providesTags: [ "education" ]
        }),
        addEducation: build.mutation({
            query: (data) => {
                return {
                    url: `/education/create`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: [ "education" ]
        }),
        editEducation: build.mutation({
            query: (data) => {
                return {
                    url: `/education/${data?.id}`,
                    method: "PUT",
                    body: {
                        instituteName: data.instituteName,
                        department: data.department,
                        session: data.session,
                        description: data.description
                    }
                }
            },
            invalidatesTags: [ "education" ]
        }),
        deleteEducation: build.mutation({
            query: (id) => {
                // console.log({ id })
                return {
                    url: `/education/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: [ "education" ]
        }),

          getAllUsers: build.query({
            query: () => {
                return {
                    url: `/users`,
                    method: "GET",
                }
            }
        }),
          sendMail: build.mutation({
            query: (data) => {
                return {
                    url: `/users/contact/sendEmail`,
                    method: "POST",
                    body:data
                }
            }
        }),

    })
})

export const {
    useUpdateProfileImageMutation,
    useUpdateBannerImageMutation,
    useGetUserByIdQuery,
    useGetAllAwardsQuery,
    useAddAwardMutation,
    useEditAwardMutation,
    useDeleteAwardMutation,
    useGetAllEducationsQuery,
    useAddEducationMutation,
    useEditEducationMutation,
    useLazyGetAllEducationsQuery,
    useDeleteEducationMutation,
    useUpdateUserInfoMutation,
    useGetAllUsersQuery,
    useSendMailMutation
} = authApi;