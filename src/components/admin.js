import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Ensure only admin users can access this page
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/signin');
      return;
    }

    const user = JSON.parse(storedUser);

    // Check if the user is an admin
    if (user.role !== 'admin') {
      alert('You are not authorized to access this page');
      navigate('/home'); // Redirect to a non-admin page
    }
  }, [navigate]);

  // Fetch products (or other data)
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://your-api-url.com/api/get_product_details') // Change to your actual API endpoint
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  // Handle product deletion
  const handleDelete = (productId) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`https://your-api-url.com/api/delete_product/${productId}`) // Change to your actual API endpoint
        .then(() => {
          // Remove product from state after deletion
          setProducts(products.filter((product) => product.product_id !== productId));
          alert('Product deleted successfully.');
        })
        .catch((err) => {
          console.error(err);
          alert(`Failed to delete product: ${err.response?.data?.message || "Please try again later"}`);
        });
    }
  };

  // Handle product addition or update (simple example)
  const handleAddProduct = () => {
    navigate('/add-product'); // Navigate to a form for adding a new product
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {/* Loading and Error States */}
      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {error && <p className="text-danger">{error}</p>}

      {/* Button to Add New Product */}
      <button className="btn btn-primary" onClick={handleAddProduct}>Add New Product</button>

      {/* Product List */}
      <h2 className="mt-4">Products</h2>
      {products.length === 0 ? (
        <p>No products available. Please add some products.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>Ksh {product.product_cost}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.product_id)}>
                    Delete
                  </button>
                  <button className="btn btn-info mx-2" onClick={() => navigate(`/edit-product/${product.product_id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
