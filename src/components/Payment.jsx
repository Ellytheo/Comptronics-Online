import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const product = location.state?.product || {}; 

  const img_url = "https://0909El.pythonanywhere.com/static/images/";
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Processing payment...");

    try {
      const formData = new FormData();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://0909El.pythonanywhere.com/api/mpesa_payment",
        formData
      );

      setLoading("");
      setSuccess(response.data.message);
      setError("");

      //  Redirect to a success page after payment
      setTimeout(() => {
        navigate("/profile"); // Change "/success" to your actual success page route
      }, 2000);
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.response?.data?.message || "Payment failed. Try again.");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <h1 className="m-2">Make M-Pesa Payment - LIPA NA M-PESA</h1>
      <div className="card shadow col-md-4 p-2">
        <h1 className="text-success">LIPA NA M-PESA</h1>

        {/*  Display messages properly */}
        {loading && <p className="text-warning">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        {/*  Prevents errors if product has no image */}
        {product.product_photo ? (
          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
            className="img-fluid"
          />
        ) : (
          <p className="text-muted">No image available</p>
        )}

        <h3 className="text-secondary">{product.product_name || "Unknown Product"}</h3>
        <p className="text-danger">Ksh {product.product_cost || "0"}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter 254********"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
