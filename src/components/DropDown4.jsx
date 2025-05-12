import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Dropdown4 = ({ label }) => {
  const [hoveredMain, setHoveredMain] = useState(false);
  const hideTimeoutRef = useRef(null);

  const categoryPaths = {
    "Butchery": "/butchery",
    "Bakery": "/bakery",
    "Vegetables": "/vegetables",
    "Dairy": "/dairy",
    "Cold Deli": "/colddeli",
    "Packed Fresh": "/packedfresh",
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

export default Dropdown4;
