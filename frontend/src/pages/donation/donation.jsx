import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const DonationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Donation Details:", data);
    alert("Thank you for your donation!");
  };

  return (
    <section className="min-h-screen p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 px-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Make a Donation</h2>
          <p className="text-gray-600 mb-6">Your support helps us continue providing amazing books!</p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="block text-left font-medium text-gray-700">Full Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
            </div>

            <div>
              <label className="block text-left font-medium text-gray-700">Email Address</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
            </div>

            <div>
              <label className="block text-left font-medium text-gray-700">Donation Amount ($)</label>
              <input
                {...register("amount", { required: true })}
                type="number"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter amount"
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">Amount is required</p>}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-left font-medium text-gray-700">Message (Optional)</label>
              <textarea
                {...register("message")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write a message (optional)"
              ></textarea>
            </div>

            <div className="lg:col-span-2 flex items-center justify-between mt-4">
              <Link to="/" className="text-purple-600 hover:underline">Go Back</Link>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
              >
                Donate Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonationPage;
