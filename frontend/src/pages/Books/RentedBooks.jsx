import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getImageURL } from "../../utils/getImageURL";
import {
  fetchRentals,
  returnBookAsync,
  clearRentalAsync,
  clearAllRentalsAsync,
} from "../../redux/features/cart/rentSlice";

const RentedBooks = () => {
  const dispatch = useDispatch();
  const rentedBooks = useSelector((state) => state.rent.rentedBooks);
  const rentStatus = useSelector((state) => state.rent.status);

  useEffect(() => {
    if (rentStatus === "idle") {
      dispatch(fetchRentals());
    }
  }, [rentStatus, dispatch]);

  const handleReturnBook = async (bookId) => {
    try {
      await dispatch(returnBookAsync(bookId)).unwrap();
      alert("Book returned successfully");
    } catch (error) {
      alert(error.message || "Failed to return book");
    }
  };

  const handleClearRental = async (bookId) => {
    try {
      await dispatch(clearRentalAsync(bookId)).unwrap();
      alert("Rental cleared successfully");
    } catch (error) {
      alert(error.message || "Failed to clear rental");
    }
  };

  const handleClearAllRentals = async () => {
    try {
      if (window.confirm("Are you sure you want to clear all rentals?")) {
        await dispatch(clearAllRentalsAsync()).unwrap();
        alert("All rentals cleared successfully");
      }
    } catch (error) {
      alert(error.message || "Failed to clear all rentals");
    }
  };

  const activeRentals = rentedBooks.filter(
    (rental) => rental.status === "active"
  );
  const totalPriceForCheckout =
    activeRentals.reduce(
      (acc, rental) => acc + (rental.book?.newPrice || 0),
      0
    ) * 0.25; // Calculate 1/4th of the total book price

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">📚 Rented Books</h2>
        {rentedBooks.length > 0 && (
          <button
            onClick={handleClearAllRentals}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Clear All Rentals
          </button>
        )}
      </div>

      {rentedBooks.length === 0 ? (
        <p className="text-gray-500 text-center">No books rented yet.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {rentedBooks.map((rental) => (
              <div
                key={rental._id}
                className="border p-4 rounded-lg shadow-md flex"
              >
                <img
                  src={getImageURL(rental.book?.coverImage)}
                  alt={rental.book?.title}
                  className="w-24 h-32 object-cover rounded-md mr-4"
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <Link
                      to={`/books/${rental.book?._id}`}
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {rental.book?.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      Status: {rental.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Return by:{" "}
                      {new Date(rental.returnDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {rental.status === "active" && (
                      <button
                        onClick={() => handleReturnBook(rental.book?._id)}
                        className="bg-sky-500 text-white px-3 py-1 rounded-md hover:bg-sky-600 transition"
                      >
                        Return
                      </button>
                    )}
                    <button
                      onClick={() => handleClearRental(rental.book?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activeRentals.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold mb-4">
                Total Rental Cost: ${totalPriceForCheckout.toFixed(2)}
              </p>
              <Link
                to={`/checkout?totalPrice=${totalPriceForCheckout}`}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition inline-block"
              >
                Proceed to Payment
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentedBooks;
