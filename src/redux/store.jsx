import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './RtkSlices/authSlice';
import { UserSlice } from './RtkSlices/userSlice';
import { BookSlice } from './RtkSlices/BookSlice';
import { categorySlice } from './RtkSlices/categorySlice';
import { offerSlice } from './RtkSlices/offerSlice';

const store = configureStore({
    reducer:{
        [authSlice.reducerPath]:authSlice.reducer,
        [UserSlice.reducerPath]:UserSlice.reducer,
        [BookSlice.reducerPath]:BookSlice.reducer,
        [categorySlice.reducerPath]:categorySlice.reducer,
        [offerSlice.reducerPath]:offerSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(
        authSlice.middleware,
        UserSlice.middleware,
        BookSlice.middleware,
        categorySlice.middleware,
        offerSlice.middleware,
  ),
})

export default store