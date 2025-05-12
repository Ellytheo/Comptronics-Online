import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const itemExists = prev.find(
        (item) => item.product_id === product.product_id
      );
      if (itemExists) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity, purchased: false }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  };

  const markAsPurchased = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, purchased: true } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        markAsPurchased,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook for using the cart context
export const useCart = () => useContext(CartContext);
