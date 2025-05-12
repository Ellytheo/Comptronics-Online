import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //submit function
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Connecting. . . . .");
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);

      const response = await axios.post(
        "https://0909El.pythonanywhere.com/api/signup",
        formData
      );
      setLoading("");
      setSuccess(response.data.success);

    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.message)
    }
  };
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4 text-align-center">
         
          <h1>sign up form</h1>
          {loading}
          {success}
          {error}
         
        <form onSubmit={handlesubmit} action=""  >
          {/*username input */}
          <input
            type="text"
            placeholder=" Enter username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {/*email input */}
          <input
            type="email"
            placeholder=" Enter Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {/* phone input */}
          <input
            type="tel"
            placeholder=" Enter Phone number"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          {/* password input */}
          <input
            type="password"
            placeholder=" Enter Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {/**sign up */}
           
            <button type="submit" class="btn btn-primary ">
              Sign Up
            </button>
           
           
            <p>
              Already have an account?<Link to="/signin">Signin</Link>
            </p>
           
        </form>
      </div>
    </div>
  );
}

export default SignUp;

