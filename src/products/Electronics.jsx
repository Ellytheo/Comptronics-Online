import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import the image(s) you want to use
import carousel16 from "../images/carousel/carousel16.jpg"; // Example image

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const img_url = "https://0909El.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetching data from the various endpoints
      const responses = await Promise.all([
        axios.get("https://0909El.pythonanywhere.com/api/get_electronics"),
        axios.get("https://0909El.pythonanywhere.com/api/get_kitchen_appliances"),
        axios.get("https://0909El.pythonanywhere.com/api/get_sound_systems"),
        axios.get("https://0909El.pythonanywhere.com/api/get_televisions"),
        axios.get("https://0909El.pythonanywhere.com/api/get_washing_machines"),
      ]);

      // Combine all product lists from different endpoints
      const allProducts = responses.flatMap(response => response.data.products);
      setProducts(allProducts);

      // Initialize quantities for all fetched products
      const initialQuantities = {};
      allProducts.forEach((product) => {
        initialQuantities[product.product_id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      setError(error.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // Generate a unique key for each product based on its id and category
  const generateUniqueKey = (productId, category) => {
    return `${productId}-${category}`; // Unique key using productId and category
  };

  const handleAddToCart = (product, category) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productQuantity = quantities[product.product_id] || 1;
    const uniqueKey = generateUniqueKey(product.product_id, category);

    // Check if the product with the same uniqueKey already exists in the cart
    const existingIndex = storedCart.findIndex((item) => item.uniqueKey === uniqueKey);

    if (existingIndex !== -1) {
      // If it exists, update the quantity
      storedCart[existingIndex].quantity += productQuantity;
    } else {
      // Otherwise, add a new product to the cart
      storedCart.push({
        uniqueKey: uniqueKey,
        product_id: product.product_id,
        name: product.product_name,
        price: product.product_cost,
        image: img_url + product.product_photo,
        category: category,
        quantity: productQuantity,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-3">Explore Electronics Products</h1>

      {/* Static Image (instead of Swiper) */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <img
          src={carousel16} // Change this to the desired image
          alt="Electronics" // Alt text for the image
          className="w-full h-auto rounded-xl shadow-lg" // You can adjust these classes
        />
      </div>

      {/* Search Bar */}
      <div className="mb-4 w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Search electronics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading & Error Feedback */}
      {loading && <p className="text-warning text-center">Loading products...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col-2 mb-4" key={index}>
              <div className="card shadow p-3 h-100 d-flex flex-column">
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="img-fluid mx-auto"
                  style={{
                    height: "120px",
                    objectFit: "cover",
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
                      onClick={() => handleAddToCart(product)}
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

export default Electronics;
