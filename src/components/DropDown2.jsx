import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Dropdown2 = ({ label }) => {
  const [hoveredMain, setHoveredMain] = useState(false);
  const hideTimeoutRef = useRef(null);

  const categoryPaths = {
    "Food Cupboard": "/foodcupboard",
    "Fresh Foods": "/freshfoods",
    "Baby Products": "/babyproducts",
    "Beverage": "/beverage",
    "Electronics": "/electronics",
    "Cleaning": "/cleaning",
    "Cosmetics": "/cosmetics",
    "Liquor": "/liquor",
  };

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setHoveredMain(true)}
      onMouseLeave={() => {
        setHoveredMain(false);
        clearTimeout(hideTimeoutRef.current);
      }}
    >
    <button className="border-0 text-success p-1 mt-0" style={{ backgroundColor: "transparent" }}>
  {label}
</button>

      {hoveredMain && (
        <div className="dropdown-menu-custom">
          {Object.keys(categoryPaths).map((category, index) => (
            <div key={index} className="dropdown-item">
              <Link
                to={categoryPaths[category] || "#"}
                className="dropdown-category-link"
                onClick={(e) => e.stopPropagation()}
              >
                {category}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown2;
