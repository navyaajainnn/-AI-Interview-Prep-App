import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      // Replace with your actual login API call
      console.log("Logging in with", { email, password });

      // Mock response handling
      const isAuthenticated = true; // Replace with real response check
      if (isAuthenticated) {
        navigate("/dashboard"); // Replace with your route
      } else {
        setError("Invalid credentials");
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full border border-transparent hover:from-orange-600 hover:to-orange-500 transition-colors duration-200"
       >
       LOGIN
      </button>


        <p className="text-[13px] text-slate-800 mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
