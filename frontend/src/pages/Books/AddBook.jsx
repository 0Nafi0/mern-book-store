import { useState, useRef } from "react";
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
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle image selection and resizing
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview for the selected image
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        canvas.width = 180;
        canvas.height = 250;
        const ctx = canvas.getContext("2d");

        // Draw and resize image on canvas
        ctx.drawImage(img, 0, 0, 180, 250);

        // Get resized image as data URL
        const resizedImageUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImagePreview(resizedImageUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create form data to handle file upload
      const formData = new FormData();

      // Add all text fields to formData
      Object.keys(data).forEach((key) => {
        if (key !== "coverImage") {
          formData.append(key, data[key]);
        }
      });

      // Convert boolean values
      formData.set("trending", data.trending === "true");
      formData.set("availableForRent", data.availableForRent === "true");

      // Convert numeric values
      formData.set("oldPrice", parseFloat(data.oldPrice));
      formData.set("newPrice", parseFloat(data.newPrice));
      formData.set("rentalPricePerDay", parseFloat(data.rentalPricePerDay));

      if (data.rentalPricePerWeek) {
        formData.set("rentalPricePerWeek", parseFloat(data.rentalPricePerWeek));
      }

      if (data.rentalPricePerMonth) {
        formData.set(
          "rentalPricePerMonth",
          parseFloat(data.rentalPricePerMonth)
        );
      }

      formData.set("stock", parseInt(data.stock));

      // Add the image file if selected
      if (fileInputRef.current.files[0]) {
        formData.append("coverImage", fileInputRef.current.files[0]);
      } else if (data.coverImage) {
        // If URL was provided instead of file
        formData.append("coverImageUrl", data.coverImage);
      }

      const response = await fetch(
        "http://localhost:5000/api/books/create-book",
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header when using FormData
          // The browser will set it automatically with the correct boundary
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

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a local image (will be resized to 180x250)
                </p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("coverImage")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Or enter image URL"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Alternative: Provide an image URL
                </p>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Preview:
                </p>
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="h-[250px] w-[180px] object-cover border border-gray-300 rounded-md"
                />
              </div>
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
