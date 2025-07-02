import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../../components/Input/Input';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    try {
      let profileImageUrl = "";

      // TODO: Upload `profilePic` to cloud storage (e.g. Cloudinary) and get the URL
      // For now, using placeholder URL
      if (profilePic) {
        profileImageUrl = "https://placehold.co/100x100"; // Replace with real upload
      }

      // Mock user registration API call
      const user = {
        fullName,
        email,
        password,
        profilePic: profileImageUrl,
      };

      console.log("Signing up user:", user);

      // Redirect to dashboard or login page
      navigate("/dashboard"); // or setCurrentPage("login");

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-1 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 gap-3">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

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
        </div>

        {error && <p className="text-red-500 text-xs pt-3">{error}</p>}

        <button
  type="submit"
  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full border border-transparent hover:from-orange-600 hover:to-orange-500 transition-colors duration-200"
>
  SIGN UP
</button>


        <p className="text-[13px] text-slate-800 mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
