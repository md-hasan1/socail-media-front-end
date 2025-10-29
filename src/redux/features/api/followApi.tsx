/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    followersList: build.query({
      query: () => {
        return {
          url: `/follow/followers`,
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
    pendingList: build.query({
      query: () => {
        return {
          url: `/follow/requests/pending`,
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
    acceptRequest: build.mutation({
      query: (data) => {
        return {
          url: `/follow/accept`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["request"],
    }),
    declineRequest: build.mutation({
      query: (data) => {
        return {
          url: `/follow/decline/${data.requestId}`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["request"],
    }),
  }),
});

export const {
  useFollowersListQuery,
  usePendingListQuery,
  useAcceptRequestMutation,
  useDeclineRequestMutation,
} = authApi;
