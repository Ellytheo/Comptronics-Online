import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ label }) => {
  const [hoveredMain, setHoveredMain] = useState(false);
  const [hoveredSide, setHoveredSide] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null); // State for sub-category hover
  const hideTimeoutRef = useRef(null);

  // Side popups with additional info for each sub-category
  const sidePopups = {
    "Food Cupboard": [
      { label: "Breakfast", path: "/breakfast", additionalInfo: ["Cereal", "Oats", "Granola"] },
      { label: "Cooking Oils", path: "/cookingoils", additionalInfo: ["Olive oil", "Vegetable oil", "Coconut oil"] },
      { label: "Dry Foods", path: "/dryfoods", additionalInfo: ["Rice", "Pasta", "Beans"] },
      { label: "Food Additives", path: "/foodadditives", additionalInfo: ["Preservatives", "Colorants", "Flavor enhancers"] },
      { label: "Snacks", path: "/snacks", additionalInfo: ["Chips", "Cookies", "Candy"] },
      { label: "Canned Foods", path: "/cannedfoods", additionalInfo: ["Tuna", "Soup", "Vegetables"] },
    ],
    "Fresh Foods": [
      { label: "Butchery", path: "/butchery", additionalInfo: ["Beef", "Pork", "Chicken"] },
      { label: "Bakery", path: "/bakery", additionalInfo: ["Bread", "Pastries", "Muffins"] },
      { label: "Vegetables", path: "/vegetables", additionalInfo: ["Carrots", "Spinach", "Potatoes"] },
      { label: "Dairy", path: "/dairy", additionalInfo: ["Milk", "Cheese", "Yogurt"] },
      { label: "Cold Deli", path: "/colddeli", additionalInfo: ["Sausages", "Cheese", "Ham"] },
    ],
    "Baby Products": [
      { label: "Baby Transport", path: "/babytransport", additionalInfo: ["Car Seats", "Strollers", "Carriers"] },
      { label: "Baby Feeding", path: "/babyfeeding", additionalInfo: ["Bottles", "Formula", "Food"] },
      { label: "Baby Skincare", path: "/babyskincare", additionalInfo: ["Lotion", "Shampoo", "Diaper Cream"] },
      { label: "Baby Hygiene", path: "/babyhygiene", additionalInfo: ["Wipes", "Nappies", "Baby Powder"] },
    ],
    "Beverage": [
      { label: "Cold Beverage", path: "/coldbeverage", additionalInfo: ["Juices", "Soda", "Iced Tea"] },
      { label: "Hot Beverage", path: "/hotbeverage", additionalInfo: ["Coffee", "Tea", "Hot Chocolate"] },
    ],
    "Electronics": [
      { label: "Kitchen Appliances", path: "/kitchenappliances", additionalInfo: ["Microwaves", "Blenders", "Coffee Makers"] },
      { label: "Sound Systems", path: "/soundsystems", additionalInfo: ["Speakers", "Subwoofers", "Headphones"] },
      { label: "Washing Machines", path: "/washingmachines", additionalInfo: ["Front Load", "Top Load", "Combo"] },
      { label: "Televisions", path: "/televisions", additionalInfo: ["LED", "Smart TV", "4K"] },
    ],
    "Cleaning": [
      { label: "Laundry", path: "/laundry", additionalInfo: ["Detergent", "Fabric Softener", "Stain Remover"] },
      { label: "Toilet Cleaning", path: "/toiletcleaning", additionalInfo: ["Cleaner", "Brush", "Disinfectant"] },
      { label: "Dish Cleaning", path: "/dishcleaning", additionalInfo: ["Dish Soap", "Scrubbers", "Sponges"] },
      { label: "Surface Cleaning", path: "/surfacecleaning", additionalInfo: ["Sprays", "Wipes", "Cloths"] },
      { label: "AllPurpose Cleaning", path: "/allpurposecleaning", additionalInfo: ["Multi-surface cleaner", "Sanitizers", "Degreasers"] },
    ],
    "Cosmetics": [
      { label: "Wellness", path: "/wellness", additionalInfo: ["Vitamins", "Supplements", "Herbal"] },
      { label: "Personal Care", path: "/personalcare", additionalInfo: ["Shampoo", "Deodorant", "Toothpaste"] },
      { label: "Nail care", path: "/nailcare", additionalInfo: ["Nail Polish", "Nail Clippers", "Nail Art"] },
      { label: "Body Care", path: "/bodycare", additionalInfo: ["Body Lotion", "Scrubs", "Body Wash"] },
      { label: "Face Care", path: "/facecare", additionalInfo: ["Face Cream", "Serums", "Masks"] },
      { label: "Fragrances", path: "/fragrances", additionalInfo: ["Perfumes", "Deodorants", "Body Mists"] },
      { label: "Hair Care", path: "/haircare", additionalInfo: ["Shampoo", "Conditioner", "Hair Oil"] },
    ],
    "Liquor": [
      { label: "Wine", path: "/wine", additionalInfo: ["Red", "White", "Rosé"] },
      { label: "Spirits", path: "/spirits", additionalInfo: ["Vodka", "Whiskey", "Rum"] },
      { label: "Beer", path: "/beer", additionalInfo: ["Lager", "IPA", "Stout"] },
    ],
    "Promos": [
      { label: "Liquor", path: "/liquor", additionalInfo: ["Discounts", "Specials", "Offers"] },
      { label: "Cosmetics", path: "/cosmetics", additionalInfo: ["Bundles", "Discounts", "New Arrivals"] },
      { label: "Cleaning", path: "/cleaning", additionalInfo: ["Bulk Discounts", "Promo Codes", "Special Offers"] },
      { label: "Electronics", path: "/electronics", additionalInfo: ["Seasonal Offers", "Discount Codes", "Buy More, Save More"] },
      { label: "Beverage", path: "/beverage", additionalInfo: ["Special Deals", "Pack Offers", "Discounts"] },
      { label: "Baby Products", path: "/babyproducts", additionalInfo: ["Promo Packs", "Gift Offers", "Discount Codes"] },
      { label: "Food Cupboard", path: "/foodcupboard", additionalInfo: ["Buy 1 Get 1 Free", "Discounted Items", "Pack Offers"] },
      { label: "Fresh Foods", path: "/freshfoods", additionalInfo: ["Bundle Deals", "Discounts", "Seasonal Offers"] },
    ],
  };

  const categoryPaths = {
    "Food Cupboard": "/foodcupboard",
    "Fresh Foods": "/freshfoods",
    "Baby Products": "/babyproducts",
    "Beverage": "/beverage",
    "Electronics": "/electronics",
    "Cleaning": "/cleaning",
    "Cosmetics": "/cosmetics",
    "Liquor": "/liquor",
    "Promos": "/promos",
  };

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setHoveredMain(true)}
      onMouseLeave={() => {
        setHoveredMain(false);
        setHoveredSide(null);
        setHoveredSubCategory(null);
        clearTimeout(hideTimeoutRef.current);
      }}
    >
      <button className="border-0 text-success p-1" style={{ backgroundColor: "#90ee90" }}>
        {label}
      </button>

      {hoveredMain && (
        <div className="dropdown-menu-custom">
          {Object.keys(sidePopups).map((category, index) => (
            <div
              key={index}
              className="dropdown-item"
              onMouseEnter={() => {
                clearTimeout(hideTimeoutRef.current);
                setHoveredSide(category);
              }}
              onMouseLeave={() => {
                hideTimeoutRef.current = setTimeout(() => {
                  setHoveredSide(null);
                  setHoveredSubCategory(null);
                }, 700);
              }}
            >
              <Link
                to={categoryPaths[category] || "#"}
                className="dropdown-category-link"
                onClick={(e) => e.stopPropagation()}
              >
                {category}
              </Link>{" "}
              &raquo;

              {hoveredSide === category && (
                <div className="sidebar-popup">
                  <ul className="list-unstyled">
                    {sidePopups[category].map((item, i) => (
                      <li
                        key={i}
                        onMouseEnter={() => setHoveredSubCategory(item.label)} // Show additional info on hover
                        onMouseLeave={() => setHoveredSubCategory(null)}
                      >
                        <Link to={item.path}>
                          {item.label}
                        </Link>

                        {/* Additional info shown below the sub-category when hovered */}
                        {hoveredSubCategory === item.label && (
                          <div className="sub-category-info">
                            <ul>
                              {item.additionalInfo.map((info, j) => (
                                <li key={j}>{info}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
