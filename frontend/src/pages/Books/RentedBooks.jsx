import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RentedBooks = () => {
  const rentedBooks = useSelector((state) => state.rent.rentedBooks);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Rented Books</h2>
      {rentedBooks.length === 0 ? (
        <p>No books rented yet.</p>
      ) : (
        <ul>
          {rentedBooks.map((book) => (
            <li key={book._id} className="border p-4 rounded-lg mb-2">
              <Link to={`/books/${book._id}`} className="text-blue-500">
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentedBooks;
