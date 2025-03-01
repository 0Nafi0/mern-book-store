import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);

  const { search } = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const priceFromUrl = queryParams.get("totalPrice");

    if (priceFromUrl) {
      setTotalPrice(parseFloat(priceFromUrl)); // Set total price from URL
    } else {
      // Calculate total price from cart items if no URL parameter
      const calculatedTotal = cartItems.reduce(
        (acc, item) => acc + (item.book?.newPrice || 0) * item.quantity,
        0
      );
      setTotalPrice(calculatedTotal);
    }
  }, [search, cartItems]); // Added cartItems as dependency

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle the order submission logic here (like creating an order)
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                Cash On Delivery
              </h2>
              <p className="text-gray-500 mb-2">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
              <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                {/* Form Fields */}
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    {/* Other input fields (email, phone, address, etc.) */}
                    {/* ... */}

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Place an Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
