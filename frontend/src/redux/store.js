import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import rentReducer from "../redux/features/cart/rentSlice"; // Import rentSlice
import booksApi from "./features/cart/booksApi";
import ordersApi from "./features/cart/orders/ordersApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    rent: rentReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});

export default store;
