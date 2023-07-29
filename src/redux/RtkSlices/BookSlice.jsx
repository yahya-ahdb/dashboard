import {createApi } from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../constans/url';

export const BookSlice = createApi({
    reducerPath:'BookSlice',
    baseQuery:fetchBaseQuery({baseUrl:apiUrl}),
    keepUnusedDataFor:2,
    tagTypes:['books'],
    endpoints:(builder)=>({
        getAllBooks:builder.query({
            query:({headers})=>({
                url:`books`,
                headers:headers,
            }),
            keepUnusedDataFor:20,
            providesTags:['books']
        }),
        createBook:builder.mutation({
            query:({headers , body})=>({
                url:`books`,
                headers:headers,
                body : body ,
                method : "POST"
            }),
            keepUnusedDataFor:20
        }),
        deleteBook:builder.mutation({
            query:({headers , id})=>({
                url:`books/${id}`,
                headers:headers,
                method : "Delete"
            }),
            keepUnusedDataFor:20,
            invalidatesTags:['books']
        }),
        updateBook:builder.mutation({
            query:({headers , id, body})=>({
                url:`updatebooks/${id}`,
                headers:headers,
                body:body,
                method : "POST"
            }),
            keepUnusedDataFor:20,
        }),
        getBook:builder.mutation({
            query:({headers , id})=>({
                url:`books/${id}`,
                headers:headers,
                method : "GET"
            }),
            keepUnusedDataFor:20,
        }),
    })
    
})

export const { useGetAllBooksQuery , useGetBookMutation , useCreateBookMutation  , useDeleteBookMutation  , useUpdateBookMutation } = BookSlice
