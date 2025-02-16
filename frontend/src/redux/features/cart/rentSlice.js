import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentedBooks: [],
};

const rentSlice = createSlice({
  name: "rent",
  initialState: initialState,
  reducers: {
    rentBook: (state, action) => {
      state.rentedBooks.push(action.payload);
    },
    returnBook: (state, action) => {
      state.rentedBooks = state.rentedBooks.filter(book => book._id !== action.payload);
    }
  }
});

export const { rentBook, returnBook } = rentSlice.actions;
export default rentSlice.reducer;
