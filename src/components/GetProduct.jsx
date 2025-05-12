import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel"; // Import your Carousel component here

const img_url = "https://0909El.pythonanywhere.com/static/images/";

const GetProducts = () => {
  const [wineProducts, setWineProducts] = useState([]);
  const [spiritsProducts, setSpiritsProducts] = useState([]);
  const [allPurposeCleaningProducts, setAllPurposeCleaningProducts] = useState([]);
  const [snacksProducts, setSnacksProducts] = useState([]);
  const [babyTransportProducts, setBabyTransportProducts] = useState([]);
  const [babyFeedingProducts, setBabyFeedingProducts] = useState([]);
  const [babyHygieneProducts, setBabyHygieneProducts] = useState([]);
  const [babySkincareProducts, setBabySkincareProducts] = useState([]);
  const [bakeryProducts, setBakeryProducts] = useState([]);
  const [beerProducts, setBeerProducts] = useState([]);

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
        const responses = await Promise.all([
          axios.get("https://0909El.pythonanywhere.com/api/get_wine"),
          axios.get("https://0909El.pythonanywhere.com/api/get_spirits"),
          axios.get("https://0909El.pythonanywhere.com/api/get_allpurpose_cleaning"),
          axios.get("https://0909El.pythonanywhere.com/api/get_snacks"),
          axios.get("https://0909El.pythonanywhere.com/api/get_baby_transport"),
          axios.get("https://0909El.pythonanywhere.com/api/get_baby_feeding"),
          axios.get("https://0909El.pythonanywhere.com/api/get_baby_hygiene"),
          axios.get("https://0909El.pythonanywhere.com/api/get_baby_skincare"),
          axios.get("https://0909El.pythonanywhere.com/api/get_bakery"),
          axios.get("https://0909El.pythonanywhere.com/api/get_beer"),
        ]);

        setWineProducts(responses[0].data.products || []);
        setSpiritsProducts(responses[1].data.products || []);
        setAllPurposeCleaningProducts(responses[2].data.products || []);
        setSnacksProducts(responses[3].data.products || []);
        setBabyTransportProducts(responses[4].data.products || []);
        setBabyFeedingProducts(responses[5].data.products || []);
        setBabyHygieneProducts(responses[6].data.products || []);
        setBabySkincareProducts(responses[7].data.products || []);
        setBakeryProducts(responses[8].data.products || []);
        setBeerProducts(responses[9].data.products || []);

        const initialQuantities = {};
        responses.forEach((res) => {
          res.data.products.forEach((p) => {
            initialQuantities[p.product_id] = 1; // Initialize quantities for each product
          });
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
    <div
      className="card shadow-sm flex-shrink-0"
      style={{ width: "220px", scrollSnapAlign: "start" }}
    >
      <img
        src={img_url + product.product_photo}
        alt={product.product_name}
        className="card-img-top"
        style={{
          width: "100%",
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
            onClick={() => handleAddToCart(product, category)}
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
  );

  const categories = [
    { title: "Wines", products: wineProducts },
    { title: "Spirits", products: spiritsProducts },
    { title: "All Purpose Cleaning", products: allPurposeCleaningProducts },
    { title: "Snacks", products: snacksProducts },
    { title: "Baby Transport", products: babyTransportProducts },
    { title: "Baby Feeding", products: babyFeedingProducts },
    { title: "Baby Hygiene", products: babyHygieneProducts },
    { title: "Baby Skincare", products: babySkincareProducts },
    { title: "Bakery", products: bakeryProducts },
    { title: "Beer", products: beerProducts },
  ];

  return (
    <div className="container-fluid pt-4">
      <h2 className="text-center fw-bold mb-4">Explore Our Products</h2>

      {/* Carousel */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <Carousel />
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

      {categories.map((category, index) => (
        <div key={index}>
          <h3 className="text-center mb-3">{`Explore Our ${category.title}`}</h3>
          {!loading && filterProducts(category.products).length > 0 ? (
            <div
              className="d-flex overflow-auto gap-3 px-3 pb-3"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {filterProducts(category.products).map((product, index) => (
                <ProductCard key={index} product={product} category={category.title} />
              ))}
            </div>
          ) : (
            !loading && <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GetProducts;
