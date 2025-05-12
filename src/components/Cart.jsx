import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Invalid cart data", e);
        setCartItems([]);
      }
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signin");
    }

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (uniqueKey, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.uniqueKey === uniqueKey) {
          const newQty = (item.quantity || 1) + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const handleRemove = (uniqueKey) => {
    setCartItems((prev) =>
      prev.filter((item) => item.uniqueKey !== uniqueKey)
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="row justify-content-center">
            {cartItems.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
                <div className="card shadow-sm h-100 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ objectFit: "contain", height: "180px" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="text-success"><strong>Price:</strong> Ksh {item.price}</p>

                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => handleQuantityChange(item.uniqueKey, -1)}
                      >
                        −
                      </button>
                      <span className="fw-bold">Qty: {item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => handleQuantityChange(item.uniqueKey, 1)}
                      >
                        +
                      </button>
                    </div>

                    <p className="fw-bold text-success">
                      Total: Ksh {item.price * item.quantity}
                    </p>

                    <button
                      className="btn btn-danger w-100 mt-auto"
                      onClick={() => handleRemove(item.uniqueKey)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 border-top text-end">
            <h4>Total Price: <span className="text-success">Ksh {totalPrice}</span></h4>
            <button
              className="btn btn-danger mt-2"
              onClick={() => navigate("/purchase")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
