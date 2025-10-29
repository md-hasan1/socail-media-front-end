/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "./baseApi";



const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (data) => {
                return {
                    url: `/users/register`,
                    method: "POST",
                    body: data
                }
            }
        }),
        loginUser: build.mutation({
            query: (data) => {
                return {
                    url: `/auth/login`,
                    method: "POST",
                    body: data
                }
            }
        }),
        logOutUser: build.mutation({
            query: () => {
                return {
                    url: `/auth/logout`,
                    method: "POST",
                    // body: data
                }
            }
        }),
        googleLogin: build.query({
            query: () => {
                return {
                    url: `/auth/google`,
                    method: "GET",
                }
            }
        }),
        verifyEmail: build.mutation({
            query: (data) => {
                return {
                    url: `/auth/verify-otp`,
                    method: "PATCH",
                    body: data,
                }
            }
        }),
        resendOTP: build.mutation({
            query: (data) => {
                return {
                    url: `/auth/resend-otp`,
                    method: "PATCH",
                    body: data,
                }
            }
        }),
        forgotPassword: build.mutation({
            query: (data) => {
                return {
                    url: `/auth/forgot-password`,
                    method: "POST",
                    body: data,
                }
            }
        }),
        resetPassword: build.mutation({
            query: (data) => {
                return {
                    url: `/auth/reset-password`,
                    method: "POST",
                    body: data,
                }
            }
        }),

    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLazyGoogleLoginQuery,
    useLogOutUserMutation,
    useVerifyEmailMutation,
    useResendOTPMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;