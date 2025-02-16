import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import rentReducer from "../redux/features/cart/rentSlice"; // Import rentSlice
import booksApi from "./features/cart/booksApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    rent: rentReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
