import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper banner images
import pic1 from "../images/pic1.jpg";
import pic8 from "../images/pic8.jpg";
import pic16 from "../images/pic16.jpg";
import pic20 from "../images/pic20.jpg";
import pic27 from "../images/pic27.jpg";
import pic38 from "../images/pic38.jpg";
import pic40 from "../images/pic40.jpg";

const img_url = "https://0909El.pythonanywhere.com/static/images/";

const Televisions = () => {
  const [televisionProducts, setTelevisionProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch televisions data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("https://0909El.pythonanywhere.com/api/get_televisions");
        setTelevisionProducts(response.data.products || []);

        // Initialize quantities for each product
        const initialQuantities = {};
        response.data.products.forEach((product) => {
          initialQuantities[product.product_id] = 1;
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

  const filterProducts = (products) =>
    products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Generate unique key for the product
  const generateUniqueKey = (productId) => {
    return `${productId}-television`; // Using productId and "television" as category
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productQuantity = quantities[product.product_id] || 1;
    const uniqueKey = generateUniqueKey(product.product_id);

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
        category: "television", // Assign the category for the product
        quantity: productQuantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Update the cart in localStorage
    navigate("/cart"); // Navigate to the cart page
  };

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

  const ProductCard = ({ product }) => (
    <div className="col-2 mb-4">
      <div className="card shadow-sm h-100">
        <img
          src={img_url + product.product_photo}
          alt={product.product_name}
          className="card-img-top"
          style={{
            width: "100%",
            height: "150px",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.product_name}</h5>
          <p className="card-text text-muted" style={{ fontSize: "0.85rem", flexGrow: 1 }}>
            {product.product_description || "No description"}
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
  );

  return (
    <div className="container-fluid pt-4">
      <h2 className="text-center fw-bold mb-4">Explore Televisions</h2>

      {/* Swiper Banner */}
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
              <img
                src={pic}
                alt={`Slide ${idx + 1}`}
                className="w-full h-auto rounded-xl"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
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

      {/* Products Grid */}
      {!loading && filterProducts(televisionProducts).length > 0 ? (
        <div className="row">
          {filterProducts(televisionProducts).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-muted">No televisions found.</p>
      )}
    </div>
  );
};

export default Televisions;
