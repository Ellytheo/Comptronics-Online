import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/Carousel"; // Import the Carousel component

const Promos = () => {
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
      const endpoints = [
        "https://0909El.pythonanywhere.com/api/get_food_cupboard",
        "https://0909El.pythonanywhere.com/api/get_packed_fresh",
        "https://0909El.pythonanywhere.com/api/get_baby_hygiene",
        "https://0909El.pythonanywhere.com/api/get_hot_beverage",
        "https://0909El.pythonanywhere.com/api/get_sound_systems",
        "https://0909El.pythonanywhere.com/api/get_laundry",
        "https://0909El.pythonanywhere.com/api/get_nail_care",
        "https://0909El.pythonanywhere.com/api/get_wine",
        "https://0909El.pythonanywhere.com/api/get_beer",
        "https://0909El.pythonanywhere.com/api/get_spirits"
      ];

      const responses = await Promise.all(endpoints.map((url) => axios.get(url)));
      const allProducts = responses.flatMap((res) => res.data.products || []);

      setProducts(allProducts);

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

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const increaseQty = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const generateUniqueKey = (productId, category) => {
    return `${productId}-${category}`; // Unique key for each product based on ID and category
  };

  const handleAddToCart = (product, category) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productQuantity = quantities[product.product_id] || 1;
    const uniqueKey = generateUniqueKey(product.product_id, category);

    const existingIndex = storedCart.findIndex((item) => item.uniqueKey === uniqueKey);

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += productQuantity;
    } else {
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

    localStorage.setItem("cart", JSON.stringify(storedCart));
    navigate("/cart");
  };

  return (
    <div className="container-fluid row">
      <h1>Explore Promo & Category Products</h1>

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    
      {/* Feedback */}
      {loading && <p className="text-warning">Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={index}>
            <div className="card shadow p-3 h-100 d-flex flex-column">
              <img
                src={img_url + product.product_photo} // Dynamically formed product image URL
                alt={product.product_name || "Product Image"}
                className="img-fluid rounded"
                style={{
                  height: "120px", // Fixed height
                  width: "auto", // Maintain aspect ratio
                  objectFit: "contain", // Prevent cropping
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="mt-2">{product.product_name || "No Name"}</h5>
                <p className="text-muted flex-grow-1">
                  {product.product_description || "No description available"}
                </p>
                <b className="text-warning mb-2">
                  Ksh {product.product_cost || "N/A"}
                </b>

                {/* Quantity Controls */}
                <div className="d-flex align-items-center justify-content-between mt-2">
                  {/* Decrement Button aligned to left */}
                  <button
                    onClick={() => decreaseQty(product.product_id)}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    −
                  </button>

                  {/* Add to Cart Button (with space between) */}
                  <div
                    className="d-flex flex-column gap-3 mx-3 mt-3"
                    style={{ flexGrow: 1 }}
                  >
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleAddToCart(product, "promos")}
                    >
                      Add Cart ({quantities[product.product_id] || 1})
                    </button>
                  </div>

                  {/* Increment Button aligned to right */}
                  <button
                    onClick={() => increaseQty(product.product_id)}
                    className="btn btn-outline-secondary btn-sm ml-auto"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        !loading && <p className="text-muted">No products available.</p>
      )}
    </div>
  );
};

export default Promos;
