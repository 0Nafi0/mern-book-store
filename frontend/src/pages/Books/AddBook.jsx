import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/books/create-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            trending: data.trending === "true",
            availableForRent: data.availableForRent === "true",
            oldPrice: parseFloat(data.oldPrice),
            newPrice: parseFloat(data.newPrice),
            rentalPricePerDay: parseFloat(data.rentalPricePerDay),
            rentalPricePerWeek: data.rentalPricePerWeek
              ? parseFloat(data.rentalPricePerWeek)
              : null,
            rentalPricePerMonth: data.rentalPricePerMonth
              ? parseFloat(data.rentalPricePerMonth)
              : null,
            stock: parseInt(data.stock),
          }),
        }
      );

      if (response.ok) {
        alert("Book added successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          📚 Add a New Book
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 h-32"
              placeholder="Enter book description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter book category"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>

          {/* Prices & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old Price
              </label>
              <input
                type="number"
                {...register("oldPrice", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter old price"
              />
              {errors.oldPrice && (
                <p className="text-red-500 text-sm mt-1">Required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Price
              </label>
              <input
                type="number"
                {...register("newPrice", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter new price"
              />
              {errors.newPrice && (
                <p className="text-red-500 text-sm mt-1">Required</p>
              )}
            </div>
          </div>

          {/* Rental Prices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Per Day
              </label>
              <input
                type="number"
                {...register("rentalPricePerDay", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter price per day"
              />
              {errors.rentalPricePerDay && (
                <p className="text-red-500 text-sm mt-1">Required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Per Week
              </label>
              <input
                type="number"
                {...register("rentalPricePerWeek")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter price per week"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Per Month
              </label>
              <input
                type="number"
                {...register("rentalPricePerMonth")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter price per month"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              {...register("coverImage", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter cover image URL"
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-1">Required</p>
            )}
          </div>

          {/* Stock & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                {...register("stock", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter stock quantity"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">Required</p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                {...register("availableForRent")}
                className="w-5 h-5 border border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Available for Rent
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
            disabled={loading}
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
