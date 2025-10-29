import { ApiResponse, Product } from "@/types/productsDataTypes";
import { baseApi } from "./baseApi";
import { ReviewTypes } from "@/types/ReviewTypes";

// Define types for the cart and the add-to-cart response
interface AddToCartResponse {
  message: string;
  success: boolean;
}

export interface CartItem {
  id?: string;
  userId: string | undefined;
  productId: string | undefined;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  price?: number;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  product?: {
    id: string;
    title: string;
    price: number;
    Review: ReviewTypes;
    images: string[];
    description: string;
  };
}

// Define the product API
const productApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getAllProducts: build.query<Product[], void>({
      query: () => "/product",
      transformResponse: (response: ApiResponse<Product[]>) => response.data,
    }),

    getProductById: build.query<Product, string>({
      query: (id) => `/product/${id}`,
      transformResponse: (response: ApiResponse<Product>) => response.data,
    }),
    addToCart: build.mutation<AddToCartResponse, CartItem>({
      query: (cart) => ({
        url: "/cart",
        method: "POST",
        body: cart,
      }),
    }),
    createBillingInfo: build.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
    updateBillingInfo: build.mutation({
      query: (data) => ({
        url: "/orders/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["address"],
    }),
    payment: build.mutation({
      query: (data) => ({
        url: "/stripe/create-intent",
        method: "POST",
        body: data,
      }),
    }),
    getAddress: build.query({
      query: () => ({
        url: "/orders/address/my-address",
        method: "GET",
      }),
      providesTags: ["address"],
    }),
    createPaymentInfo: build.mutation({
      query: (data) => ({
        url: "/orders/confirm-order",
        method: "POST",
        body: data,
      }),
      // providesTags:['address']
    }),
    generateClientSecrete: build.mutation({
      query: (data) => ({
        url: "/stripe/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    getCartById: build.query<CartItem[], string>({
      query: () => `/cart`,
      transformResponse: (response: ApiResponse<CartItem[]>) => response.data,
      providesTags: (result, error, userId) =>
        result ? [{ type: "cart", id: userId }] : [],
    }),

    deleteCart: build.mutation<
      { success: boolean; message: string },
      { userId: string | undefined; productId: string | undefined }
    >({
      query: ({ productId }) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "cart", id: userId },
      ],
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
  useGetCartByIdQuery,
  useDeleteCartMutation,
  usePaymentMutation,
  useCreateBillingInfoMutation,
  useGenerateClientSecreteMutation,
  useGetAddressQuery,
  useUpdateBillingInfoMutation,
  useCreatePaymentInfoMutation,
} = productApi;

export default productApi;
