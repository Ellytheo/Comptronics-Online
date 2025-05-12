import React, { useState } from "react";
import "./contactpage.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send form data to an API or email service
    setFormSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page-1">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Please fill out the form below, and we'll
        get in touch with you as soon as possible.
      </p>

      {formSubmitted && (
        <p className="success-message">
          Thank you for your message! We'll get back to you soon.
        </p>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-primary">Personal Information</legend>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />

        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <textarea
          id="message"
          name="message"
          rows="4"
          className="form-control"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Enter your message"
        ></textarea>
     </fieldset> 
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
