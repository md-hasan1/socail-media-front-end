import { ApiResponse } from "@/types/productsDataTypes";
import { baseApi } from "./baseApi"; // Importing the base API instance
import { ReviewTypes } from "@/types/ReviewTypes";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<ReviewTypes, Partial<ReviewTypes>>({
      query: (newReview) => ({
        url: "/review", // Endpoint to create a new review
        method: "POST", // HTTP method
        body: newReview, // The review data being sent
      }),
      transformResponse: (response: ApiResponse<ReviewTypes>) => response.data, // Transforming response to return the created review
    }),
    getReviewsByProductId: builder.query<ReviewTypes[], string>({
      query: (productId) => `/review/${productId}`, // Endpoint to get reviews by product ID
      transformResponse: (response: ApiResponse<ReviewTypes[]>) =>
        response.data, // Transforming response to return the list of reviews
    }),
  }),
});

// Exporting hooks to use the defined mutations in components
export const { useCreateReviewMutation, useGetReviewsByProductIdQuery } =
  reviewApi;
