import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState("");
  const { registerUser, signInWithGoogle, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.username);
      setEmail(data.email);
      setMessage("Please check your email for verification code");
      setShowVerification(true);
    } catch (error) {
      setMessage(error.message || "Registration failed");
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

  const onVerify = async (data) => {
    try {
      await verifyEmail(email, data.verificationCode);
      alert("Email verified successfully");
      navigate("/login");
    } catch (error) {
      setMessage(error.message || "Verification failed");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">
          {showVerification ? "Verify Email" : "Please Register"}
        </h2>

        {!showVerification ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {message && (
              <p className="text-red-500 text-xs italic mb-3">{message}</p>
            )}

            <button className="w-full bg-[#ffce1a] text-[#0d0842] py-2.5 px-8 rounded-lg font-semibold hover:bg-[#0d0842] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onVerify)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Verification Code
              </label>
              <input
                {...register("verificationCode", { required: true })}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {message && (
              <p className="text-red-500 text-xs italic mb-3">{message}</p>
            )}

            <button className="w-full bg-[#ffce1a] text-[#0d0842] py-2.5 px-8 rounded-lg font-semibold hover:bg-[#0d0842] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
              Verify
            </button>
          </form>
        )}

        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link
            to="/login"
            className="text-[#0d0842] hover:text-[#ffce1a] font-semibold transition-colors duration-300"
          >
            Login
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

export default Register;
