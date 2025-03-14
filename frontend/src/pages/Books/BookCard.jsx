/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { getImageURL } from "../../utils/getImageURL";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../redux/features/cart/cartSlice";
import { rentBookAsync } from "../../redux/features/cart/rentSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
      await dispatch(addToCartAsync(product)).unwrap();
      // Optional: Show success message
      alert("Book added to cart successfully");
    } catch (error) {
      // Handle error (e.g., user not logged in)
      if (error.message === "Authentication required") {
        navigate("/login");
      } else {
        alert(error.message || "Failed to add book to cart");
      }
    }
  };

  const handleRentBook = async (product) => {
    try {
      // Show rental options dialog
      const rentalType = await showRentalDialog(product);
      if (!rentalType) return; // User cancelled

      console.log("Attempting to rent book:", {
        bookId: product._id,
        rentalType: rentalType,
      });

      const result = await dispatch(
        rentBookAsync({
          bookId: product._id,
          rentalType: rentalType,
        })
      ).unwrap();

      console.log("Rental result:", result);
      alert("Book added to rentals successfully");
    } catch (error) {
      console.error("Rental error:", error);
      if (error.message === "Authentication required") {
        navigate("/login");
      } else {
        alert(error.message || "Failed to rent book");
      }
    }
  };

  const showRentalDialog = (book) => {
    return new Promise((resolve) => {
      const options = [
        { label: "Daily", price: book.rentalPricePerDay, type: "daily" },
        { label: "Weekly", price: book.rentalPricePerWeek, type: "weekly" },
        { label: "Monthly", price: book.rentalPricePerMonth, type: "monthly" },
      ];

      const dialog = document.createElement("div");
      dialog.className =
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      dialog.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h3 class="text-xl font-bold mb-4">Select Rental Period</h3>
          <div class="space-y-3">
            ${options
              .map(
                (option) => `
              <button 
                class="w-full p-3 text-left border rounded hover:bg-gray-100 flex justify-between items-center"
                data-type="${option.type}"
              >
                <span>${option.label}</span>
                <span>$${option.price?.toFixed(2) || "N/A"}</span>
              </button>
            `
              )
              .join("")}
          </div>
          <button class="mt-4 w-full p-2 bg-gray-200 rounded" data-type="cancel">Cancel</button>
        </div>
      `;

      document.body.appendChild(dialog);

      dialog.addEventListener("click", (e) => {
        const type = e.target.closest("button")?.dataset.type;
        if (type) {
          document.body.removeChild(dialog);
          resolve(type === "cancel" ? null : type);
        }
      });
    });
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImageURL(book?.coverImage)}`}
              alt={book?.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              $ {book?.oldPrice}
            </span>
          </p>

          {/* Buttons Section */}
          <div className="flex gap-3">
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-yellow-500 text-black px-6 py-2 rounded-md shadow flex items-center gap-2 hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => handleRentBook(book)}
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow flex items-center gap-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <MdOutlineEventAvailable />
              <span>Rent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
