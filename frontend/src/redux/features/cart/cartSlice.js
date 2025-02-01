import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload.id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        alert("Item added Successfully!");
      } else {
        alert("Item already exits");
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
