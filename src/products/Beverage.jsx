import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import pic1 from "../images/pic1.jpg";
import pic8 from "../images/pic8.jpg";
import pic16 from "../images/pic16.jpg";
import pic20 from "../images/pic20.jpg";
import pic27 from "../images/pic27.jpg";
import pic38 from "../images/pic38.jpg";
import pic40 from "../images/pic40.jpg";

const Beverage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://0909El.pythonanywhere.com/static/images/";

  // Fetching products from API
  const getProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const [coldBeverages, hotBeverages] = await Promise.all([
        axios.get("https://0909El.pythonanywhere.com/api/get_cold_beverage"),
        axios.get("https://0909El.pythonanywhere.com/api/get_hot_beverage"),
      ]);

      const combinedProducts = [...coldBeverages.data.products, ...hotBeverages.data.products];
      setProducts(combinedProducts);

      const initialQuantities = {};
      combinedProducts.forEach((product) => {
        initialQuantities[product.product_id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      setError(error.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize the products when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  // Function to generate a unique key for the product (based on product_id and category)
  const generateUniqueKey = (productId, category) => {
    return `${productId}-${category}`; // Generate a unique key for each product in the cart
  };

  // Handle adding products to cart
  const handleAddToCart = (product, category = "beverages") => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
    const quantity = quantities[product.product_id] || 1; // Get the quantity for the product
    const uniqueKey = generateUniqueKey(product.product_id, category); // Generate a unique key

    const existingIndex = storedCart.findIndex((item) => item.uniqueKey === uniqueKey); // Check if product is already in the cart

    if (existingIndex !== -1) {
      // If product exists in the cart, update its quantity
      storedCart[existingIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      storedCart.push({
        uniqueKey: uniqueKey,
        product_id: product.product_id,
        name: product.product_name,
        price: product.product_cost,
        image: img_url + product.product_photo,
        category: category,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Save updated cart back to localStorage
    navigate("/cart"); // Navigate to the cart page
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

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <h1>Explore Beverages</h1>

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

      {/* Swiper Carousel */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-xl shadow-lg"
        >
          {[pic1, pic8, pic16, pic20, pic27, pic38, pic40].map((pic, idx) => (
            <SwiperSlide key={idx}>
              <img src={pic} alt={`Slide ${idx + 1}`} className="w-full h-auto rounded-xl" />
            </SwiperSlide>
          ))}
        </Swiper>
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
                  style={{ height: "120px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="mt-2">{product.product_name || "No Name"}</h5>
                  <p className="text-muted flex-grow-1">
                    {product.product_description || "No description available"}
                  </p>
                  <b className="text-warning mb-2">
                    Ksh {product.product_cost || "N/A"}
                  </b>

                  {/* Quantity Controls and Add to Cart Button */}
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <button
                      onClick={() => decreaseQty(product.product_id)}
                      className="btn btn-outline-secondary btn-sm"
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
                      onClick={() => increaseQty(product.product_id)}
                      className="btn btn-outline-secondary btn-sm"
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

export default Beverage;
