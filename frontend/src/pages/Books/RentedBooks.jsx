import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { returnBook, clearRentedBooks } from "../../redux/features/cart/rentSlice";

const RentedBooks = () => {
  const rentedBooks = useSelector((state) => state.rent.rentedBooks);
  const dispatch = useDispatch();

  const totalPriceForCheckout = rentedBooks.reduce(
    (acc, book) => acc + book.newPrice,
    0
  ) * 0.25;  // Calculate 1/4th of the total book price

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Rent Books</h2>

      {rentedBooks.length === 0 ? (
        <p className="text-gray-500 text-center">No books rented yet.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {rentedBooks.map((book) => (
              <div key={book._id} className="border p-4 rounded-lg shadow-md flex">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md mr-4"
                />
                <div>
                  <Link
                    to={`/books/${book._id}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {book.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{book.author}</p>

                  {/* Buttons Container */}
                  <div className="flex gap-2 mt-3">
                    {/* Return Button (Sky Blue) */}
                    <button
                      onClick={() => dispatch(returnBook(book._id))}
                      className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition"
                    >
                      Return
                    </button>

                    {/* Clear Button (Red) */}
                    <button
                      onClick={() => dispatch(returnBook(book._id))}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rent Button */}
          <button
            onClick={() => window.location.href = `/checkout?totalPrice=${totalPriceForCheckout}`}
            className="bg-green-500 text-white px-6 py-3 mt-6 block mx-auto rounded-md hover:bg-green-600 transition"
          >
            Rent (Pay 1/4th - ${totalPriceForCheckout.toFixed(2)})
          </button>

          {/* Clear All Button */}
          <button
            onClick={() => dispatch(clearRentedBooks())}
            className="bg-red-600 text-white px-6 py-3 mt-6 block mx-auto rounded-md hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

export default RentedBooks;
