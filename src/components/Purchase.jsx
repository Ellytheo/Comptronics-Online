import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const Purchase = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Processing payment...");

    try {
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const formData = new FormData();
      formData.append("amount", totalAmount);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://0909El.pythonanywhere.com/api/mpesa_payment",
        formData
      );

      setLoading("");
      setSuccess(response.data.message);
      setError("");

      setTimeout(() => {
        navigate("/profile");
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
      <div className="card shadow col-md-6 p-4">
        <h2 className="text-success">LIPA NA M-PESA</h2>

        {!user && (
          <div className="alert alert-warning">
            Please sign in to make a payment.
          </div>
        )}

        {loading && <p className="text-warning">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Cart items list */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product_id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Ksh {item.price * item.quantity}</span>
              </div>
            ))
          )}
        </div>

        <h4 className="mt-3">
          Total: Ksh{" "}
          {cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}
        </h4>

        {/* Phone number input */}
        {user && (
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              className="form-control mb-3"
              placeholder="Enter 254********"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">
              Purchase
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Purchase;
