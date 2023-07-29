import {createApi } from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../constans/url';

export const UserSlice = createApi({
    reducerPath:'UserSlice',
    baseQuery:fetchBaseQuery({baseUrl:apiUrl}),
    keepUnusedDataFor:2,
    endpoints:(builder)=>({
        getUser:builder.query({
            query:({headers})=>({
                url:`all_user`,
                headers:headers,
            }),
            keepUnusedDataFor:20
        }),
        getUserBook:builder.mutation({
            query:({headers, id})=>({
                url:`user_book/${id}`,
                headers:headers,
            }),
            keepUnusedDataFor:20
        }),
    })
    
})

export const { useGetUserQuery , useGetUserBookMutation } = UserSlice
