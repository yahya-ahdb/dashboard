import {createApi } from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../constans/url';

export const authSlice = createApi({
    reducerPath:'authSlice',
    baseQuery:fetchBaseQuery({baseUrl:apiUrl}),
    keepUnusedDataFor:2,
    endpoints:(builder)=>({
        Login:builder.mutation({
            query:({body})=>({
                url:`login`,
                body:body,
                method:'POST'
            }),
            keepUnusedDataFor:20
        }),
        logOut:builder.mutation({
            query:({headers})=>({
                url:`logout`,
                headers:headers,
                method:'POST'
            }),
            keepUnusedDataFor:20
        }),
        refreshToken:builder.mutation({
            query:({headers})=>({
                url:`refresh`,
                headers:headers,
                method:'GET'
            }),
            keepUnusedDataFor:20
        }),
    })
    
})

export const {useLoginMutation ,useLogOutMutation ,useRefreshTokenMutation} = authSlice
