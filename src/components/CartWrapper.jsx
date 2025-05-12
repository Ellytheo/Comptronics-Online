import { useNavigate } from "react-router-dom";
import { CartProvider } from "../CartContext";

const CartWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <CartProvider navigate={navigate}>
      {children}
    </CartProvider>
  );
};

export default CartWrapper;
