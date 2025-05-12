import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryRoutes = [
  { label: 'All Purpose Cleaning', path: 'addallpurpose' },
  { label: 'Baby Feeding', path: 'addbabyfeeding' },
  { label: 'Baby Hygiene', path: 'addbabyhygiene' },
  { label: 'Baby Skincare', path: 'addbabyskincare' },
  { label: 'Baby Transport', path: 'addbabytransport' },
  { label: 'Bakery', path: 'addbakery' },
  { label: 'Beer', path: 'addbeer' },
  { label: 'Beverage', path: 'addbeverage' },
  { label: 'Body Care', path: 'addbodycare' },
  { label: 'Breakfast', path: 'addbreakfast' },
  { label: 'Butchery', path: 'addbutchery' },
  { label: 'Canned Foods', path: 'addcannedfoods' },
  { label: 'Cleaning', path: 'addcleaning' },
  { label: 'Cold Beverage', path: 'addcoldbeverage' },
  { label: 'Cold Deli', path: 'addcolddeli' },
  { label: 'Cooking Oils', path: 'addcookingoils' },
  { label: 'Cosmetics', path: 'addcosmetics' },
  { label: 'Dairy', path: 'adddairy' },
  { label: 'Dish Cleaning', path: 'adddishcleaning' },
  { label: 'Dry Foods', path: 'adddryfoods' },
  { label: 'Electronics', path: 'addelectronics' },
  { label: 'Face Care', path: 'addfacecare' },
  { label: 'Food Additives', path: 'addfoodadditives' },
  { label: 'Food Cupboard', path: 'addfoodcupboard' },
  { label: 'Fragrances', path: 'addfragrances' },
  { label: 'Fresh Foods', path: 'addfreshfoods' },
  { label: 'Hair Care', path: 'addhaircare' },
  { label: 'Hot Beverage', path: 'addhotbeverage' },
  { label: 'Kitchen Appliances', path: 'addkitchenappliances' },
  { label: 'Laundry', path: 'addlaundry' },
  { label: 'Liquor', path: 'addliquor' },
  { label: 'Nail Care', path: 'addnailcare' },
  { label: 'Packed Fresh', path: 'addpackedfresh' },
  { label: 'Personal Care', path: 'addpersonalcare' },
  { label: 'Snacks', path: 'addsnacks' },
  { label: 'Sound Systems', path: 'addsoundsystems' },
  { label: 'Spirits', path: 'addspirits' },
  { label: 'Surface Cleaning', path: 'addsurfacecleaning' },
  { label: 'Televisions', path: 'addtelevisions' },
  { label: 'Toilet Cleaning', path: 'addtoiletcleaning' },
  { label: 'Vegetables', path: 'addvegetables' },
  { label: 'Washing Machine', path: 'addwashingmachine' },
  { label: 'Wellness', path: 'addwellness' },
  { label: 'Wine', path: 'addwine' }
];

const AdminPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Please sign in first.');
      navigate('/signin');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      alert('You are not authorized to access the Admin Page.');
      navigate('/profile');
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [navigate]);

  const handleAddProduct = (categoryPath) => {
    navigate(`/${categoryPath}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // clear user session
    navigate('/getproduct'); // go to home page
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome Admin {user.username}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        {categoryRoutes.map((cat, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <button
              className="btn btn-success w-100"
              onClick={() => handleAddProduct(cat.path)}
            >
              Add {cat.label} Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
