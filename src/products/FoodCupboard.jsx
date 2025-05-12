import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/Carousel"; 

const FoodCupboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://0909El.pythonanywhere.com/static/images/";

  const getProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://0909El.pythonanywhere.com/api/get_food_cupboard");
      setProducts(response.data.products);

      const initialQuantities = {};
      response.data.products.forEach((p) => {
        initialQuantities[p.product_id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      setError(error.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  const generateUniqueKey = (productId) => {
    return `${productId}`; // Generate a unique key for each product by ID
  };

  const handleAddToCart = (product) => {
    const productQuantity = quantities[product.product_id] || 1;
    const uniqueKey = generateUniqueKey(product.product_id);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = storedCart.findIndex((item) => item.uniqueKey === uniqueKey);

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += productQuantity; // Update quantity if product already in cart
    } else {
      storedCart.push({
        uniqueKey,
        product_id: product.product_id,
        name: product.product_name,
        price: product.product_cost,
        image: img_url + product.product_photo,
        quantity: productQuantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Update cart in localStorage
    navigate("/cart"); // Navigate to cart page after adding product
  };

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1, // Increase quantity by 1
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1, // Ensure quantity doesn't go below 1
    }));
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
     

      {/* Carousel */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <Carousel /> {/* Use the Carousel component here */}
      </div>

      {/* Search Bar */}
      <div className="mb-4 w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Filter products based on search input
        />
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-warning text-center">Loading products...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col-2 mb-4" key={index}>
              <div className="product-card shadow p-3 h-100 d-flex flex-column">
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="img-fluid mx-auto"
                  style={{
                    height: "120px", // Fixed height for product card images
                    objectFit: "cover", // Ensures image fits within container
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="mt-2">{product.product_name}</h5>
                  <p className="text-muted flex-grow-1">
                    {product.product_description || "No description available"}
                  </p>
                  <b className="text-warning mb-2">
                    Ksh {product.product_cost || "N/A"}
                  </b>
                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decreaseQty(product.product_id)}
                    >
                      −
                    </button>

                    <button
                      className="btn btn-success mx-2 flex-grow-1"
                      onClick={() => handleAddToCart(product)} // Add to cart handler
                    >
                      Add Cart ({quantities[product.product_id] || 1})
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => increaseQty(product.product_id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-muted text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default FoodCupboard;
