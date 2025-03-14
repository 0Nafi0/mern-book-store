import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { search } = useLocation();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const priceFromUrl = queryParams.get("totalPrice");

    if (priceFromUrl) {
      setTotalPrice(parseFloat(priceFromUrl));
    } else {
      const calculatedTotal = cartItems.reduce(
        (acc, item) => acc + (item.book?.newPrice || 0) * item.quantity,
        0
      );
      setTotalPrice(calculatedTotal);
    }
  }, [search, cartItems]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const orderData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      productIds: cartItems.map((item) => item.book._id),
      totalPrice: totalPrice,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();

      if (response.ok && result.url) {
        // Open SSLCommerz payment gateway in a new tab
        window.open(result.url, "_blank");
      } else {
        alert("Failed to place order: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Checkout
            </h2>
            <p className="text-gray-500 mb-2">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email</label>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone</label>
                      <input
                        {...register("phone", { required: true })}
                        type="tel"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="city">City</label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="country">Country</label>
                      <input
                        {...register("country")}
                        type="text"
                        id="country"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="state">State</label>
                      <input
                        {...register("state")}
                        type="text"
                        id="state"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register("zipcode")}
                        type="text"
                        id="zipcode"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Place Order
                      </button>
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
