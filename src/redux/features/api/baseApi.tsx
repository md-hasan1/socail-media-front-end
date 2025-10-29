/* eslint-disable @typescript-eslint/no-unused-vars */

import { RootState } from "@/redux/store";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearUser, setUser } from "../slices/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
  credentials: "include",
  prepareHeaders: (headers, {}) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token` as string,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(setUser({ ...user, token: data.token.accessToken }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearUser());
      }
    } catch (error) {}
  }
  if (result.error?.status === 403) {
    api.dispatch(clearUser());
  }

  return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: [ "me", "awards", "education", "posts", "connect", "cart","request","address" ],
    endpoints: () => ({}),

});
