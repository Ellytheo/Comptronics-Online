import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const img_url = "https://0909El.pythonanywhere.com/static/images/";

const BabyFeeding = () => {
  const [babyFeedingProducts, setBabyFeedingProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://0909El.pythonanywhere.com/api/get_baby_feeding"
        );
        setBabyFeedingProducts(response.data.products || []);

        const initialQuantities = {};
        response.data.products.forEach((p) => {
          initialQuantities[p.product_id] = 1; // Initialize quantities for each product
        });
        setQuantities(initialQuantities);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔁 Cart handling using localStorage
  const generateUniqueKey = (productId, category) => {
    return `${productId}-${category}`; // Generate a unique key by combining productId and category
  };

  const handleAddToCart = (product, category) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productQuantity = quantities[product.product_id] || 1;
    const uniqueKey = generateUniqueKey(product.product_id, category);

    // Check if the product already exists in the cart
    const existingIndex = storedCart.findIndex((item) => item.uniqueKey === uniqueKey);

    if (existingIndex !== -1) {
      // Update the quantity of the existing product in the cart
      storedCart[existingIndex].quantity += productQuantity;
    } else {
      // Add the product as a new entry to the cart
      storedCart.push({
        uniqueKey: uniqueKey, // Save the unique key to distinguish this product
        product_id: product.product_id,
        name: product.product_name,
        price: product.product_cost,
        image: img_url + product.product_photo,
        category: category,
        quantity: productQuantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Update the cart in localStorage
    navigate("/cart"); // Navigate to the cart page
  };

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1, // Increment quantity for the product
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1, // Decrement but ensure quantity doesn't go below 1
    }));
  };

  // Filter products based on the search term
  const filterProducts = (products) =>
    products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const ProductCard = ({ product, category }) => (
    <div className="col-2 mb-4">
      <div className="card shadow-sm h-100">
        <img
          src={img_url + product.product_photo}
          alt={product.product_name}
          className="card-img-top"
          style={{
            height: "200px",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.product_name}</h5>
          <p className="card-text text-muted" style={{ fontSize: "0.85rem", flexGrow: 1 }}>
            {product.product_description || "No description available"}
          </p>
          <p className="fw-bold text-success mb-2">Ksh {product.product_cost}</p>
          <div className="d-flex align-items-center justify-content-between">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => decreaseQty(product.product_id)}
            >
              −
            </button>
            <button
              className="btn btn-success btn-sm mx-2 flex-grow-1"
              onClick={() => handleAddToCart(product, "Baby Feeding")}
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
  );

  return (
    <div className="container-fluid pt-4">
      <h2 className="text-center fw-bold mb-4">Explore Baby Feeding Products</h2>

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
          {/* Your images */}
          <SwiperSlide>
            <img src="path/to/your/image.jpg" alt="Image 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="path/to/your/image.jpg" alt="Image 2" />
          </SwiperSlide>
          {/* Add more slides here */}
        </Swiper>
      </div>

      {/* Search Bar */}
      <div className="mb-4 w-100 px-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="text-warning text-center">Loading products...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Product Grid */}
      <div className="row">
        {!loading && filterProducts(babyFeedingProducts).length > 0 ? (
          filterProducts(babyFeedingProducts).map((product, index) => (
            <ProductCard key={index} product={product} category="Baby Feeding" />
          ))
        ) : (
          !loading && <p className="text-center text-muted">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default BabyFeeding;
