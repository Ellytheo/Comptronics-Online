import React, { useState, useEffect } from "react";

// Example product data (replace with real API data)
const products = [
  { id: 1, name: "Apple", price: 100, description: "Fresh apples", rating: 4.5 },
  { id: 2, name: "Milk", price: 50, description: "Organic milk", rating: 4.8 },
  { id: 3, name: "Bread", price: 30, description: "Whole wheat bread", rating: 4.2 },
  { id: 4, name: "Rice", price: 200, description: "Basmati rice", rating: 4.7 },
];

// A helper function to process bot responses with regex patterns
const getBotResponse = (input, cart, setCart) => {
  const lowerInput = input.toLowerCase();

  // Regex patterns for different intents
  const greetingRegex = /(hello|hi|hey|good morning|good afternoon|good evening)/i;
  const showProductsRegex = /(show me products|search products|what products do you have)/i;
  const addToCartRegex = /add (\d+|\w+) to cart/i; // Handles both product name and ID
  const removeFromCartRegex = /remove (\d+|\w+) from cart/i;
  const viewCartRegex = /(view my cart|show my cart|cart items)/i;
  const checkoutRegex = /(checkout|order summary|buy now)/i;
  const storeHoursRegex = /store hours/i;
  const deliveryRegex = /delivery/i;
  const productDetailsRegex = /details about (\d+|\w+)/i; // Get product details

  // Handle greetings like "hi", "hello", etc.
  if (greetingRegex.test(lowerInput)) {
    return `Hello! How can I assist you today? 😊`;
  }

  // Match "show me products" or similar
  if (showProductsRegex.test(lowerInput)) {
    return `Here are the products available:\n${products
      .map((product) => `${product.name} - $${product.price}`)
      .join("\n")}`;
  }

  // Match "add to cart" and add the correct product
  const addMatch = input.match(addToCartRegex);
  if (addMatch) {
    const productNameOrId = addMatch[1];
    const product = products.find(
      (p) =>
        p.name.toLowerCase() === productNameOrId.toLowerCase() ||
        p.id === parseInt(productNameOrId)
    );
    if (product) {
      setCart([...cart, product]); // Update cart state correctly
      return `Added ${product.name} to the cart.`;
    }
    return "Sorry, I couldn't find that product. Try using the product name or ID.";
  }

  // Match "remove from cart" and remove the correct product
  const removeMatch = input.match(removeFromCartRegex);
  if (removeMatch) {
    const productNameOrId = removeMatch[1];
    const productIndex = cart.findIndex(
      (p) =>
        p.name.toLowerCase() === productNameOrId.toLowerCase() ||
        p.id === parseInt(productNameOrId)
    );
    if (productIndex !== -1) {
      const updatedCart = [...cart]; // Create a new cart array
      updatedCart.splice(productIndex, 1); // Remove the item
      setCart(updatedCart); // Use setCart to update the cart state
      return `Removed ${cart[productIndex].name} from the cart.`;
    }
    return "That product is not in your cart.";
  }

  // Match "view cart" to show cart items
  if (viewCartRegex.test(lowerInput)) {
    if (cart.length === 0) {
      return "Your cart is empty.";
    }
    return `Your cart contains:\n${cart
      .map((item) => `${item.name} - $${item.price}`)
      .join("\n")}`;
  }

  // Match "checkout" to proceed to checkout
  if (checkoutRegex.test(lowerInput)) {
    if (cart.length === 0) {
      return "Your cart is empty. Add items before checking out.";
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return `You have ${cart.length} items in your cart. Total: $${total}. Proceed to checkout.`;
  }

  // Match "store hours" to provide store hours info
  if (storeHoursRegex.test(lowerInput)) {
    return "Our store is open from 9 AM to 9 PM, 7 days a week.";
  }

  // Match "delivery" to give delivery info
  if (deliveryRegex.test(lowerInput)) {
    return "We offer home delivery within 5 miles. Delivery charges apply based on location.";
  }

  // Match "product details" to give more information about a product
  const detailsMatch = input.match(productDetailsRegex);
  if (detailsMatch) {
    const productNameOrId = detailsMatch[1];
    const product = products.find(
      (p) =>
        p.name.toLowerCase() === productNameOrId.toLowerCase() ||
        p.id === parseInt(productNameOrId)
    );
    if (product) {
      return `${product.name}: ${product.description} - $${product.price} (Rating: ${product.rating} stars)`;
    }
    return "Sorry, I couldn't find that product.";
  }

  return "Sorry, I didn't understand that. Try asking about products, cart, or checkout.";
};

// Persistent Cart Management
const getSavedCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [cart, setCart] = useState(getSavedCart()); // Load cart from localStorage
  const [showChat, setShowChat] = useState(false); // Manage chat visibility

  // Handle user input and bot response
  const handleUserInput = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      const userMessage = { sender: "user", text: userInput };
      setMessages((prev) => [...prev, userMessage]);

      // Get bot response based on input and current cart
      const botMessage = { sender: "bot", text: getBotResponse(userInput, cart, setCart) };
      setMessages((prev) => [...prev, botMessage]);

      setUserInput(""); // Clear user input
    }
  };

  // Toggle chat visibility
  const toggleChatVisibility = () => {
    setShowChat((prev) => !prev);
    if (!showChat) {
      // Send a friendly greeting when the chat is opened for the first time
      const botGreeting = { sender: "bot", text: "Hello! How can I assist you today? 😊" };
      setMessages((prev) => [...prev, botGreeting]);
    }
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  return (
    <div className="chatbot">
      {/* Chatbot icon */}
<div className="chat-icon" onClick={toggleChatVisibility}>
  🤖 {/* Robot emoji as the chat icon */}
</div>


      {/* Chatbot container */}
      {showChat && (
        <div className="chatbot-container">
          <div className="chatbox">
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === "user" ? "user" : "bot"}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleUserInput} className="input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me something..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
