import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../../utils/baseUrl";

// Async thunks
export const fetchRentals = createAsyncThunk(
  "rent/fetchRentals",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${getBaseUrl()}/api/auth/rentals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.rentals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rentBookAsync = createAsyncThunk(
  "rent/rentBook",
  async (book, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/rentals`,
        { bookId: book._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.rentals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const returnBookAsync = createAsyncThunk(
  "rent/returnBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${getBaseUrl()}/api/auth/rentals/${bookId}/return`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.rentals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearRentalAsync = createAsyncThunk(
  "rent/clearRental",
  async (bookId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${getBaseUrl()}/api/auth/rentals/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.rentals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearAllRentalsAsync = createAsyncThunk(
  "rent/clearAllRentals",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${getBaseUrl()}/api/auth/rentals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.rentals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rentSlice = createSlice({
  name: "rent",
  initialState: {
    rentedBooks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentedBooks = action.payload;
      })
      .addCase(fetchRentals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch rentals";
      })
      .addCase(rentBookAsync.fulfilled, (state, action) => {
        state.rentedBooks = action.payload;
      })
      .addCase(returnBookAsync.fulfilled, (state, action) => {
        state.rentedBooks = action.payload;
      })
      .addCase(clearRentalAsync.fulfilled, (state, action) => {
        state.rentedBooks = action.payload;
      })
      .addCase(clearAllRentalsAsync.fulfilled, (state) => {
        state.rentedBooks = [];
      });
  },
});

export default rentSlice.reducer;
