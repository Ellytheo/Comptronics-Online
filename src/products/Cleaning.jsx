import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import pic1 from "../images/pic1.jpg";
import pic8 from "../images/pic8.jpg";
import pic16 from "../images/pic16.jpg";
import pic20 from "../images/pic20.jpg";
import pic27 from "../images/pic27.jpg";
import pic38 from "../images/pic38.jpg";
import pic40 from "../images/pic40.jpg";

const Cleaning = () => {
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
      const responses = await Promise.all([
        axios.get("https://0909El.pythonanywhere.com/api/get_allpurpose_cleaning"),
        axios.get("https://0909El.pythonanywhere.com/api/get_laundry"),
        axios.get("https://0909El.pythonanywhere.com/api/get_dish_cleaning"),
        axios.get("https://0909El.pythonanywhere.com/api/get_surface_cleaning"),
        axios.get("https://0909El.pythonanywhere.com/api/get_toilet_cleaning")
      ]);

      const allProducts = responses.flatMap(response => response.data.products);
      setProducts(allProducts);

      const initialQuantities = {};
      allProducts.forEach((p) => {
        initialQuantities[p.product_id] = 1;
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

  // 🔁 Cart handling using localStorage
  const generateUniqueKey = (productId, category) => {
    return `${productId}-${category}`; // Generate a unique key by combining productId and category
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

  // Increase and decrease the product quantity
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

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <h1>Explore Cleaning Products</h1>

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

      {/* Loading & Error */}
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
                    height: "120px", // Fixed height
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
                      onClick={() => handleAddToCart(product, "cleaning")}
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

export default Cleaning;
