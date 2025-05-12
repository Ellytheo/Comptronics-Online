import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (!storedUser) {
      navigate("/signin");
      return;
    }

    try {
      setUser(JSON.parse(storedUser)); // Parsing user from localStorage
    } catch (e) {
      console.error("Invalid user data", e);
      navigate("/signin");
    }

    try {
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCartItems(parsedCart);
    } catch (e) {
      console.error("Invalid cart data", e);
      setCartItems([]);
    }

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const cost = item.price || 0;
    const quantity = item.quantity || 1;
    return !item.purchased ? acc + cost * quantity : acc;
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/promos");
  };

  const handleRemoveFromCart = (uniqueKey) => {
    const updatedCart = cartItems.filter((item) => item.unique_key !== uniqueKey);
    setCartItems(updatedCart);
  };

  const handlePurchase = () => {
    const updatedCart = cartItems.map((item) =>
      !item.purchased ? { ...item, purchased: true } : item
    );
    setCartItems(updatedCart);
    navigate("/purchase");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Cart Section */}
        <div className="col-md-6">
          <h2>🛒 Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.unique_key} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Ksh {item.price}</p>
                  <p className="card-text fw-bold text-success">
                    Ksh {item.price} x {item.quantity} = Ksh {item.price * item.quantity}
                  </p>

                  {item.purchased ? (
                    <span className="badge bg-success">
                      ✔ Bought - Wait for delivery
                    </span>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.unique_key)}
                    >
                      Remove from Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {totalPrice > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>Total: Ksh {totalPrice}</h4>
              <button className="btn btn-primary" onClick={handlePurchase}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="col-md-6">
          <h2>👤 User Profile</h2>
          {user ? (
            <div className="card p-4 shadow mt-4">
              <p><strong>Username:</strong> {user.username || "N/A"}</p>
              <p><strong>Email:</strong> {user.email || "N/A"}</p>
              {/* Removed phone info */}
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <p>User information not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
