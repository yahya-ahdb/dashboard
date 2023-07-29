import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../constans/url";

export const offerSlice = createApi({
  reducerPath: "offerSlice",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  keepUnusedDataFor: 2,
  tagTypes:['offer'],
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: ({ headers }) => ({
        url: `offer`,
        headers: headers,
        method: "GET",
      }),
      keepUnusedDataFor: 20,
      providesTags:['offer']
    }),
    createOffer: builder.mutation({
      query: ({ headers, body }) => ({
        url: `offer`,
        headers: headers,
        body: body,
        method: "POST",
      }),
      keepUnusedDataFor: 20,
      invalidatesTags:['offer']
    }),
    updateOffer: builder.mutation({
      query: ({ headers, id, body }) => ({
        url: `offer/${id}`,
        headers: headers,
        body: body,
        method: "PUT",
      }),
      keepUnusedDataFor: 20,
      invalidatesTags:['offer']
    }),
    deleteOffer: builder.mutation({
      query: ({ headers, id }) => ({
        url: `offer/${id}`,
        headers: headers,
        method: "Delete",
      }),
      keepUnusedDataFor: 20,
      invalidatesTags:['offer']
    }),
  }),
});

export const {
  useGetOffersQuery , 
  useCreateOfferMutation,
  useDeleteOfferMutation,
  useUpdateOfferMutation
} = offerSlice;
