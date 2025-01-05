import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import ProductForm from "./pages/ProductForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddStock from "./pages/AddStock";
import ProductList from "./pages/ProductList";
import { useAuthStore } from "./store/authStore";
import GetVarient from "./pages/GetSubVarient";
import ListStock from "./pages/ListStock";
import GetVarients from "./pages/GetVarients";
import ListVarientSTock from "./pages/ListVarientSTock";
import AddVarientStock from "./pages/AddVarientStock";
import { AiOutlineLogin } from "react-icons/ai";

const App = () => {
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavClick = () => {
    setIsDropdownOpen(false); // Close the dropdown when a nav option is clicked
  };

  return (
    <Router>
      <nav className="bg-gray-700 text-white md:h-24 lg:h-24 xl:h-24">
        <div className="flex justify-between items-center p-4">
          <button
            className="block md:hidden px-3 py-2  rounded text-white "
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-8 h-1 bg-white m-1 rounded-lg"></div>
            <div className="w-7 h-1 bg-white ml-1 rounded-lg"></div>
          </button>
        </div>
        <div
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } md:flex md:justify-center md:items-center`}
        >
          {!user ? (
            <>
              <NavLink
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block md:inline-block m-4 py-2 mb-12 text-lg ${
                    isActive ? "underline" : ""
                  }`
                }
                to="/signup"
              >
                Signup
              </NavLink>
              <NavLink
                onClick={handleNavClick}
                className={({ isActive }) =>
                  ` block flex md:inline-block m-4 mb-12 text-lg ${
                    isActive ? "underline" : ""
                  }`
                }
                to="/"
              >
  
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block md:inline-block m-4 mb-8 ${
                    isActive ? "underline" : ""
                  }`
                }
                to="/createproduct"
              >
                Create Product
              </NavLink>
              <NavLink
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block md:inline-block m-4 mb-8 ${
                    isActive ? "underline" : ""
                  }`
                }
                to="/listproduct"
              >
                List Product
              </NavLink>
          
              <NavLink
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block md:inline-block m-4 mb-8 ${
                    isActive ? "underline" : ""
                  }`
                }
                to="/listvarientstock"
              >
                List Variant Stock
              </NavLink>
           
              <NavLink
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block md:inline-block m-4 mb-8  ${
                    isActive ? "underline" : ""
                  }`
                }
                to="/listsubstock"
              >
                List Sub Variant Stock
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  handleNavClick(); // Close dropdown on logout
                }}
                className="block md:inline-block m-4 mb-8 p-1 bg-red-500 rounded text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/createproduct"
          element={user ? <ProductForm /> : <Navigate to="/" />}
        />
     
        <Route
          path="/listproduct"
          element={user ? <ProductList /> : <Navigate to="/" />}
        />
        <Route
          path="/listsubstock"
          element={user ? <ListStock /> : <Navigate to="/" />}
        />
        <Route
          path="/subvariant/:subvariantId/addstock"
          element={user ? <AddStock /> : <Navigate to="/" />}
        />
        <Route
          path="/variant/:variantId/addstock"
          element={user ? <AddVarientStock /> : <Navigate to="/" />}
        />
       
        <Route
          path="/listvarientstock"
          element={user ? <ListVarientSTock /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
