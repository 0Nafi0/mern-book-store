import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentedBooks: [],
};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    rentBook: (state, action) => {
      state.rentedBooks.push(action.payload);
    },
    returnBook: (state, action) => {
      state.rentedBooks = state.rentedBooks.filter(book => book._id !== action.payload);
    },
    clearRentedBooks: (state) => {
      state.rentedBooks = []; // Clears all rented books
    }
  }
});

export const { rentBook, returnBook, clearRentedBooks } = rentSlice.actions;
export default rentSlice.reducer;
