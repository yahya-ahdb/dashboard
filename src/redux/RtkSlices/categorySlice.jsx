import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../constans/url";

export const categorySlice = createApi({
  reducerPath: "categorySlice",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  keepUnusedDataFor: 2,
  tagTypes:['category'],
  endpoints: (builder) => ({
    GetCategory: builder.query({
      query: ({ headers }) => ({
        url: `category`,
        headers: headers,
        method: "GET",
      }),
      keepUnusedDataFor: 20,
      providesTags:['category']
    }),
    createCategory: builder.mutation({
      query: ({ headers, body }) => ({
        url: `category`,
        headers: headers,
        body: body,
        method: "POST",
      }),
      keepUnusedDataFor: 20,
      invalidatesTags:['category']
    }),
    updateCategory: builder.mutation({
      query: ({ headers, id, body }) => ({
        url: `category/${id}`,
        headers: headers,
        body: body,
        method: "POST",
      }),
      keepUnusedDataFor: 20,
      invalidatesTags:['category']
    }),
    deleteCategory: builder.mutation({
      query: ({ headers, id }) => ({
        url: `category/${id}`,
        headers: headers,
        method: "Delete",
      }),
      keepUnusedDataFor: 20,
      invalidatesTags:['category']
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
