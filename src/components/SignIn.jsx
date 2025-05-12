import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Connecting...");
    setSuccess("");
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://0909El.pythonanywhere.com/api/signin",
        formData
      );

      setLoading("");
      const user = response.data.user;

      if (user) {
        setSuccess(response.data.message);
        localStorage.setItem("user", JSON.stringify(user));

        const productToAdd = location.state?.productToAdd;
        const redirectPath = location.state?.from || (user.role === "admin" ? "/adminpage" : "/cart");

        if (productToAdd) {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(productToAdd);
          localStorage.setItem("cart", JSON.stringify(cart));
        }

        navigate(redirectPath);
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setLoading("");
      setSuccess("");
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading("Signing in with Google...");
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://0909El.pythonanywhere.com/user/signin/google",
        { google_token: credentialResponse.credential }
      );

      const user = response.data.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setSuccess("Google Sign-In successful");

        const redirectPath = location.state?.from || (user.role === "admin" ? "/adminpage" : "/cart");
        navigate(redirectPath);
      } else {
        setError("Google login failed.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.response?.data?.message || "Google Sign-In failed.");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="row justify-content-center mt-4 signin">
      <div className="col-md-6 card shadow p-4 text-align-center">
        <h1>Sign In Form</h1>
        {loading && <p className="text-info">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : " 👀"}
            </button>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center mb-3">
          <p>or sign in with</p>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google Sign-In was cancelled or failed.")}
          />
        </div>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
