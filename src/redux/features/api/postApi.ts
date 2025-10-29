import { TApiResponse } from "@/types/globalTyps";
import { baseApi } from "./baseApi";
import PostDataType from "@/types/postDataTypes";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/post/posts",
      }),
      providesTags: ["posts"],
    }),
    getSinglePost: builder.query({
      query: (id) => {
      
       return{
        url: `/post/posts/${id}`,
        method: "GET",
      
       }
      },
      providesTags: ["posts"],
    }),
    getAllTributesPosts: builder.query({
      query: () => ({
        url: "/post/tributes-posts",
      }),
      providesTags: ["posts"],
    }),
    getMyPost: builder.query({
      query: () => ({
        url: "/post/get-my-posts",
      }),
      providesTags: ["posts"],
    }),
    getAllMyLikeIds: builder.query({
      query: () => ({
        url: "/like/my-likes",
      }),
      providesTags: ["posts"],
    }),
    getAllMyFavorites: builder.query({
      query: () => {
        return {
          url: `/favorites/user/all`,
        };
      },
      providesTags: ["posts"],
    }),
    getAllCommentBaseOnPost: builder.query({
      query: (id) => ({
        url: `/comments/post/${id}`,
      }),
      providesTags: ["posts"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createPost: builder.mutation<TApiResponse<PostDataType>, any>({
      query: (post) => ({
        url: "/post/add-post",
        method: "POST",
        body: post,
      }),
      transformResponse: (response: TApiResponse<PostDataType>) => response,
      invalidatesTags: ["posts"],
    }),
    toggleLike: builder.mutation({
      query: (id) => ({
        url: `/like/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["posts"],
    }),
    toggleFavorite: builder.mutation({
      query: (body) => ({
        url: `/favorites/toggle`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts"],
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: `/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts"],
    }),
    sendRequest: builder.mutation({
      query: (body) => ({
        url: `/follow/request`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["connect", "posts"],
    }),
    myConnection: builder.query({
      query: () => ({
        url: `/follow/requests/my-request`,
        method: "GET",
      }),
      providesTags: ["connect", "posts"],
    }),

    updatePostById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/post/update-posts/${id}`, // Use the `id` to identify the post
        method: "PUT",
        body: formData, // Send `formData` directly in the body
      }),
      invalidatesTags: ["posts"], // Invalidate "posts" tag to refresh related queries
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    Shear: builder.mutation({
      query: (data) => ({
        url: `/share`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetAllMyLikeIdsQuery,
  useToggleLikeMutation,
  useAddCommentMutation,
  useGetAllCommentBaseOnPostQuery,
  useGetAllMyFavoritesQuery,
  useSendRequestMutation,
  useDeletePostMutation,
  useToggleFavoriteMutation,
  useMyConnectionQuery,
  useGetMyPostQuery,
  useShearMutation,
  useGetAllTributesPostsQuery,
  useGetSinglePostQuery,
  useUpdatePostByIdMutation
} = postApi;
