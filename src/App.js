import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AddProduct from "./components/AddProduct";
import GetProduct from "./components/GetProduct";
import Payment from "./components/Payment";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faHome, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {  FaShoppingCart, FaBaby, FaTv, FaWineBottle, FaGlobe, FaUserCircle } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';
import { MdKitchen } from 'react-icons/md';
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Dropdown from "./components/DropDown";

import AllpurposeCleaning from "./products/AllpurposeCleaning";
import BabyFeeding from "./products/BabyFeeding";
import BabyHYgiene from "./products/BabyHYgiene";
import BabyProducts from "./products/BabyProducts";
import BabySkincare from "./products/BabySkincare";
import BabyTransport from "./products/BabyTransport";
import Bakery from "./products/Bakery";
import Beer from "./products/Beer";
import Beverage from "./products/Beverage";
import BodyCare from "./products/BodyCare";
import Breakfast from "./products/Breakfast";
import Butchery from "./products/Butchery";
import CannedFoods from "./products/CannedFoods";
import Cleaning from "./products/Cleaning";
import ColdBeverage from "./products/ColdBeverage";
import ColdDeli from "./products/ColdDeli";
import CookingOils from "./products/CookingOils";
import Cosmetics from "./products/Cosmetics";
import Dairy from "./products/Dairy";
import DishCleaning from "./products/DishCleaning";
import DryFoods from "./products/DryFoods";
import Electronics from "./products/Electronics";
import FaceCare from "./products/FaceCare";
import FoodAdditives from "./products/FoodAdditives";
import FoodCupboard from "./products/FoodCupboard";
import Fragrances from "./products/Fragrances";
import FreshFoods from "./products/FreshFoods";
import HairCare from "./products/HairCare";
import HotBeverage from "./products/HotBeverage";
import KitchenAppliances from "./products/KitchenAppliances";
import Laundry from "./products/Laundry";
import Liquor from "./products/Liquor";
import NailCare from "./products/NailCare";
import PackedFresh from "./products/PackedFresh";
import PersonalCare from "./products/PersonalCare";
import Promos from "./products/Promos";
import Snacks from "./products/Snacks";
import SoundSystems from "./products/SoundSystems";
import Spirits from "./products/Spirits";
import SurfaceCleaning from "./products/SurfaceCleaning";
import Televisions from "./products/Televisions";
import ToiletCleaning from "./products/ToiletCleaning";
import Vegetables from "./products/Vegetables";
import WashingMachine from "./products/WashingMachine";
import Wellness from "./products/Wellness";
import Wine from "./products/Wine";
import Dropdown2 from "./components/DropDown2";
import Dropdown7 from "./components/DropDown7";
import Dropdown6 from "./components/DropDown6";
import Dropdown5 from "./components/DropDown5";
import Dropdown4 from "./components/DropDown4";
import Dropdown3 from "./components/DropDown3";
import Cart from "./components/Cart";
import CartWrapper from "./components/CartWrapper";
import { CartProvider } from "./CartContext";
import Profile from "./components/Profile";
import Purchase from "./components/Purchase";
import AdminPage from "./components/AdminPage";
import AddAllpurpose from "./addproduct/AddAllpurpose";
import AddBabyhygiene from "./addproduct/AddBabyhygiene";
import Addbabyskincare from "./addproduct/AddBabyskincare";
import AddBabytransport from "./addproduct/AddBabytransport";
import AddBakery from "./addproduct/AddBakery";
import AddBeer from "./addproduct/AddBeer";
import AddBeverage from "./addproduct/AddBeverage";
import AddBodycare from "./addproduct/AddBodycare";
import AddBreakfast from "./addproduct/AddBreakfast";
import AddButchery from "./addproduct/AddButchery";
import AddCannedfoods from "./addproduct/AddCannedfoods";
import AddCleaning from "./addproduct/AddCleaning";
import AddColdbeverage from "./addproduct/AddColdbeverage";
import AddColddeli from "./addproduct/AddColddeli";
import AddCookingoils from "./addproduct/AddCookingoils";
import AddCosmetics from "./addproduct/AddCosmetics";
import AddDairy from "./addproduct/AddDairy";
import AddDishcleaning from "./addproduct/AddDishcleaning";
import AddDryfoods from "./addproduct/AddDryfoods";
import AddElectronics from "./addproduct/AddElectronics";
import AddFacecare from "./addproduct/AddFacecare";
import AddFoodadditives from "./addproduct/AddFoodadditives";
import AddFoodcupboard from "./addproduct/AddFoodcupboard";
import AddFragrances from "./addproduct/AddFragrances";
import AddFreshfoods from "./addproduct/AddFreshfoods";
import AddHaircare from "./addproduct/AddHaircare";
import AddHotbeverages from "./addproduct/AddHotbeverage";
import AddKitchenappliances from "./addproduct/AddKitchenappliances";
import AddLaundy from "./addproduct/AddLaundry";
import AddNailcare from "./addproduct/AddNailcare";
import AddPackedfresh from "./addproduct/AddPackedfresh";
import AddPersonalcare from "./addproduct/AddPersonalcare";
import AddSnacks from "./addproduct/AddSnacks";
import AddSoundsystems from "./addproduct/AddSoundsystems";
import AddSpirits from "./addproduct/AddSpirits";
import AddSurfacecleaning from "./addproduct/AddSurfacecleaning";
import AddTelevisions from "./addproduct/AddTelevisions";
import AddToiletcleaning from "./addproduct/AddToiletcleaning";
import AddVegetables from "./addproduct/AddVegetables";
import AddWashingmachines from "./addproduct/AddWashingmachines";
import AddWellness from "./addproduct/AddWellness";
import AddWine from "./addproduct/AddWine";
import AddBabyfeeding from "./addproduct/AddBabyfeeding";
import Carousel from "./components/Carousel";
import Chatbot from "./components/Chatbot";

const App = () => {

  
  return (
   
    <div className="App">
      <BrowserRouter>
      <CartProvider>
      <CartWrapper>
      {/* Top fixed section */}
    <div className="fixed-top-wrapper">

      <div className="app text-align-start bg-success p-1 text-light">
        <p><i>Thank you for choosing to trade with us online!</i></p>
      </div>

        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="/home/user/Desktop/hyrax/elius-project/src/images/pic55.avif"
            >
              COMP-TRONICS
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
          
            <ul className="navbar-nav ms-auto">
  <li className="nav-item">
    <Link
      to="/signup"
      className="nav-link border border-white rounded-pill px-3 py-1 bg-success m-1 text-white text-center"
    >
      <FontAwesomeIcon icon={faUserPlus} className="me-2" /> SignUp
    </Link>
  </li>
  <li className="nav-item">
    <Link
      to="/signin"
      className="nav-link border border-white rounded-pill px-3 py-1 bg-success m-1 text-white text-center"
    >
      <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> SignIn
    </Link>
  </li>
  <li className="nav-item">
    <Link
      to="/getproduct"
      className="nav-link border border-white rounded-pill px-3 py-1 bg-success m-1 text-white text-center"
    >
      <FontAwesomeIcon icon={faHome} className="me-2" /> Home
    </Link>
  </li>
  <li className="nav-item">
    <Link
      to="/aboutus"
      className="nav-link border border-white rounded-pill px-3 py-1 bg-success m-1 text-white text-center"
    >
      <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> About Us
    </Link>
  </li>
  <li className="nav-item">
    <Link
      to="/contactus"
      className="nav-link border border-white rounded-pill px-3 py-1 bg-success m-1 text-white text-center"
    >
      <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Contact Us
    </Link>
  </li>
</ul>


            </div>
          </div>
        </nav>


        <header className="App-header d-flex justify-content-center align-items-start py-2 px-2">
  <div className="d-flex justify-content-start w-100 gap-2 align-items-center">
    <div className="text-center mb-0">
      <Link to="/promos" className="text-decoration-none text-dark">
        <Dropdown 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <i className="bi bi-grid" style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Categories</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          }
        />
      </Link>
    </div>

    <div className="text-center mb-0">
      <Link to="/promos" className="text-decoration-none text-dark">
        <Dropdown2 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <FaGlobe style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Promos</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          } 
        />
      </Link>
    </div>

    <div className="text-center mb-0">
      <Link to="/foodcupboard" className="text-decoration-none text-dark">
        <Dropdown3 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <GiFruitBowl style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Food Cupboard</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          } 
        />
      </Link>
    </div>

    <div className="text-center mb-0">
      <Link to="/freshfoods" className="text-decoration-none text-dark">
        <Dropdown4 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <MdKitchen style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Fresh Foods</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          } 
        />
      </Link>
    </div>

    <div className="text-center mb-0">
      <Link to="/babyproducts" className="text-decoration-none text-dark">
        <Dropdown5 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <FaBaby style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Baby Products</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          } 
        />
      </Link>
    </div>

    <div className="text-center mb-0">
      <Link to="/electronics" className="text-decoration-none text-dark">
        <Dropdown6 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <FaTv style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Electronics</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          } 
        />
      </Link>
    </div>

    <div className="text-center mb-0">
      <Link to="/liquor" className="text-decoration-none text-dark">
        <Dropdown7 
          label={
            <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
              <FaWineBottle style={{ fontSize: '1.2rem' }} />  {/* Icon */}
              <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Liquor</span>  {/* Label */}
              <span className="ms-1"><i className="bi bi-arrow-down" style={{ fontSize: '1rem' }} /></span>  {/* Arrow */}
            </div>
          } 
        />
      </Link>
    </div>

    <div className="text-center mt-0 mb-0">
      <Link to="/cart" className="text-decoration-none text-dark">
        <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" style={{ width: 'auto', padding: '0 5px' }}>
          <FaShoppingCart style={{ fontSize: '1.2rem' }} />
          <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Cart</span>
        </div>
      </Link>
    </div>

    <div className="text-center mt-0 mb-0">
      <Link to="/profile/:id" className="text-decoration-none text-dark">
        <div className="icon-box icon-hover w-100 d-flex justify-content-start align-items-center" 
        style={{ width: 'auto', padding: '0 5px' }}>
          <FaUserCircle style={{ fontSize: '1.2rem' }} />
          <span className="ms-1 text-gold" style={{ fontSize: '0.9rem' }}>Profile</span>
        </div>
      </Link>
    </div>
  </div>
</header>

<Chatbot />

        </div>
        <div style={{ height: "180px" }}></div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/getproduct" element={<GetProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/*" element={<GetProduct />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/chatbot" element={<Chatbot />} />


          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/dropdown2" element={<Dropdown2 />} />
          <Route path="/dropdown3" element={<Dropdown3 />} />
          <Route path="/dropdown4" element={<Dropdown4 />} />
          <Route path="/dropdown5" element={<Dropdown5 />} />
          <Route path="/dropdown6" element={<Dropdown6 />} />
          <Route path="/dropdown7" element={<Dropdown7 />} />
          <Route path="/carousel" element={<Carousel />} />

          <Route path="/allpurposecleaning" element={<AllpurposeCleaning />} />
          <Route path="/babyfeeding" element={<BabyFeeding />} />
          <Route path="/babyhygiene" element={<BabyHYgiene />} />
          <Route path="/babyproducts" element={<BabyProducts />} />
          <Route path="/babyskincare" element={<BabySkincare />} />
          <Route path="/babytransport" element={<BabyTransport />} />
          <Route path="/bakery" element={<Bakery />} />
          <Route path="/beer" element={<Beer />} />
          <Route path="/beverage" element={<Beverage />} />
          <Route path="/bodycare" element={<BodyCare />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/butchery" element={<Butchery />} />
          <Route path="/cannedfoods" element={<CannedFoods />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/coldbeverage" element={<ColdBeverage />} />
          <Route path="/colddeli" element={<ColdDeli />} />
          <Route path="/cookingoils" element={<CookingOils />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/dishcleaning" element={<DishCleaning />} />
          <Route path="/dryfoods" element={<DryFoods />} />
           <Route path="/electronics" element={<Electronics />} />
          <Route path="/facecare" element={<FaceCare />} />
          <Route path="/foodadditives" element={<FoodAdditives />} />
          <Route path="/foodcupboard" element={<FoodCupboard />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/freshfoods" element={<FreshFoods />} />
          <Route path="/haircare" element={<HairCare />} />
          <Route path="/hotbeverage" element={<HotBeverage />} />
          <Route path="/kitchenappliances" element={<KitchenAppliances />} />
          <Route path="/laundry" element={<Laundry />} />
          <Route path="/liquor" element={<Liquor />} />
          <Route path="/nailcare" element={<NailCare />} />
          <Route path="/packedfresh" element={<PackedFresh />} />
          <Route path="/personalcare" element={<PersonalCare />} />
          <Route path="/promos" element={<Promos/>} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/soundsystems" element={<SoundSystems />} />
          <Route path="/spirits" element={<Spirits />} />
          <Route path="/surfacecleaning" element={<SurfaceCleaning />} />
          <Route path="/televisions" element={<Televisions />} />
          <Route path="/toiletcleaning" element={<ToiletCleaning />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/washingmachine" element={<WashingMachine />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/wine" element={<Wine />} />

          <Route path="/addallpurpose" element={<AddAllpurpose />} />
          <Route path="/addbabyhygiene" element={<AddBabyhygiene />} />
          <Route path="/addbabyskincare" element={<Addbabyskincare />} />
          <Route path="/addbabytransport" element={<AddBabytransport />} />
          <Route path="/addbabyfeeding" element={<AddBabyfeeding />} />
          <Route path="/addbakery" element={<AddBakery />} />
          <Route path="/addbeer" element={<AddBeer />} />
          <Route path="/addbeverage" element={<AddBeverage />} />
          <Route path="/addbodycare" element={<AddBodycare />} />
          <Route path="/addbreakfast" element={<AddBreakfast />} />
          <Route path="/addbutchery" element={<AddButchery />} />
          <Route path="/addcannedfoods" element={<AddCannedfoods />} />
          <Route path="/addcleaning" element={<AddCleaning />} />
          <Route path="/addcoldbeverage" element={<AddColdbeverage />} />
          <Route path="/addcolddeli" element={<AddColddeli />} />
          <Route path="/addcookingoils" element={<AddCookingoils />} />
          <Route path="/addcosmetics" element={<AddCosmetics />} />
          <Route path="/adddairy" element={<AddDairy />} />
          <Route path="/adddishcleaning" element={<AddDishcleaning />} />
          <Route path="/adddryfoods" element={<AddDryfoods />} />
           <Route path="/addelectronics" element={<AddElectronics />} />
          <Route path="/addfacecare" element={<AddFacecare />} />
          <Route path="/addfoodadditives" element={<AddFoodadditives />} />
          <Route path="/addfoodcupboard" element={<AddFoodcupboard />} />
          <Route path="/addfragrances" element={<AddFragrances />} />
          <Route path="/addfreshfoods" element={<AddFreshfoods />} />
          <Route path="/addhaircare" element={<AddHaircare />} />
          <Route path="/addhotbeverage" element={<AddHotbeverages />} />
          <Route path="/addkitchenappliances" element={<AddKitchenappliances />} />
          <Route path="/addlaundry" element={<AddLaundy />} />
          <Route path="/addnailcare" element={<AddNailcare />} />
          <Route path="/addpackedfresh" element={<AddPackedfresh />} />
          <Route path="/addpersonalcare" element={<AddPersonalcare />} />
          <Route path="/addsnacks" element={<AddSnacks />} />
          <Route path="/addsoundsystems" element={<AddSoundsystems />} />
          <Route path="/addspirits" element={<AddSpirits />} />
          <Route path="/addsurfacecleaning" element={<AddSurfacecleaning />} />
          <Route path="/addtelevisions" element={<AddTelevisions />} />
          <Route path="/addtoiletcleaning" element={<AddToiletcleaning />} />
          <Route path="/addvegetables" element={<AddVegetables />} />
          <Route path="/addwashingmachine" element={<AddWashingmachines />} />
          <Route path="/addwellness" element={<AddWellness />} />
          <Route path="/addwine" element={<AddWine />} />
          
        </Routes>
       
        {/* Footer Section */}
        <footer className=" text-light py-4 mt-5 App-footer">
          <div className="container">
            <div className="row text-start">
              {/* About Section */}
              <div className="col-md-4">
                <h5>About Us</h5>
                <p>
                  Your one-stop shop for the latest electronics. Quality
                  products at the best prices.
                </p>
              </div>

              {/* Contact Section */}
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p>Email: support@comp-tronics.com</p>
                <p>Phone: +254 712 345678</p>
              </div>

              {/* Follow Us Section */}
              <div className="col-md-4">
                <h5>Follow Us</h5>
                <p>
                  <a href="facebook" className="text-light mx-2">
                    Facebook
                  </a>{" "}
                  <a href="twitter" className="text-light mx-2">
                    Twitter
                  </a>{" "}
                  |
                  <a href="instagram" className="text-light mx-2">
                    Instagram
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
        </CartWrapper>
        </CartProvider>
      </BrowserRouter>
    </div> 
  );
};

export default App;
