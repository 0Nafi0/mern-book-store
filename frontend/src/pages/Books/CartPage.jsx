import { useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  // Sample cart data (Replace with Redux or API)
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Product Title",
      category: "Fiction",
      price: 50,
      quantity: 1,
      image: "/assets/books/book-1.png", // Ensure correct path
    },
  ]);

  // Handle Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-medium text-gray-900">Shopping Cart</h1>
          <button
            type="button"
            onClick={handleClearCart}
            className="ml-3 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Items */}
        <div className="mt-8">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <ul className="-my-6 divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={item.title}
                      src={item.image}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to="/">{item.title}</Link>
                      </h3>
                      <p className="sm:ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      <strong>Category:</strong> {item.category}
                    </p>

                    <div className="flex flex-1 justify-between items-center mt-2 text-sm">
                      <p className="text-gray-500">
                        <strong>Qty:</strong> {item.quantity}
                      </p>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-sm text-gray-500">
          <Link to="/">
            or{" "}
            <button className="text-indigo-600 hover:text-indigo-500 ml-1">
              Continue Shopping &rarr;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
