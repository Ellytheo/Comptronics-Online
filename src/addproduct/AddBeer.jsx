import axios from "axios";
import React, { useState } from "react";

const AddBeer = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  //feedback
  const [loading,setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Connecting. . . . .");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post("https://0909El.pythonanywhere.com/api/add_beer",formData);
      setLoading("");
      setSuccess(response.data.message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto('');

    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4 text-align-center">
        <h1>Welcome to AddProduct</h1>
        {loading}
        {success}
        {error}
        <form onSubmit={handlesubmit} action="">
          <input
            type="text"
            placeholder=" Enter product name"
            className="form-control"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />

          <br />
          <textarea
            name=""
            id=""
            placeholder="Enter product description"
            className="form-control"
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>

          <br />
          <input
            type="number"
            placeholder="Enter product cost"
            className="form-control"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />

          <br />
          <input
            type="file"
            placeholder="Enter product photo"
            className="form-control"
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />

          <br />
          <button type="submit" class="btn btn-primary">
            Add beer product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBeer;
