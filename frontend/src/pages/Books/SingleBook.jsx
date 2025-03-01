import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../redux/features/cart/booksApi";
import { getImageURL } from "../../utils/getImageURL";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../redux/features/cart/cartSlice";
import { rentBookAsync } from "../../redux/features/cart/rentSlice";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineEventAvailable } from "react-icons/md";

const SingleBook = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    try {
      await dispatch(addToCartAsync(product)).unwrap();
      alert("Book added to cart successfully");
    } catch (error) {
      alert(error.message || "Failed to add book to cart");
    }
  };

  const handleRentBook = async (product) => {
    try {
      await dispatch(rentBookAsync(product)).unwrap();
      alert("Book rented successfully");
    } catch (error) {
      alert(error.message || "Failed to rent book");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading book info</div>;

  return (
    <div className="max-w-lg shadow-md p-5 mx-auto">
      <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

      <div>
        <img
          src={`${getImageURL(book.coverImage)}`}
          alt={book.title}
          className="mb-8"
        />
        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book.description}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3">
          <button
            onClick={() => handleAddToCart(book)}
            className="bg-yellow-500 text-black px-6 py-2 rounded-md shadow flex items-center gap-2 hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>

          {/* Show "Rent Again" Button Only for Rented Books */}
          {location.pathname.includes("/rented-books/") && (
            <button
              onClick={() => handleRentBook(book)}
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow flex items-center gap-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <MdOutlineEventAvailable />
              <span>Rent Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
