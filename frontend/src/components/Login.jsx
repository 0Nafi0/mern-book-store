import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("User logged in successfully");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("User logged in successfully");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="w-full bg-[#ffce1a] text-[#0d0842] py-2.5 px-8 rounded-lg font-semibold hover:bg-[#0d0842] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Haven&apos;t an account? Please{" "}
          <Link
            to="/register"
            className="text-[#0d0842] hover:text-[#ffce1a] font-semibold transition-colors duration-300"
          >
            Register
          </Link>
        </p>
        {/* google sign in */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white text-[#0d0842] py-2.5 px-8 rounded-lg font-semibold border-2 border-[#0d0842] hover:bg-[#0d0842] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
