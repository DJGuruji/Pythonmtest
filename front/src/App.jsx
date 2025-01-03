import React, { useState, useEffect } from "react";
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
import GetVarient from "./pages/GetVarient";
import ListStock from "./pages/ListStock";

const App = () => {
  const { user, logout } = useAuthStore();

  return (
    <Router>
      <nav className="flex justify-center p-4 bg-gray-700 text-white">
        {!user && (
          <>
            <NavLink
              className={({ isActive }) =>
                `mx-4 ${isActive ? "underline" : ""}`
              }
              to="/signup"
            >
              Signup
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `mx-4 ${isActive ? "underline" : ""}`
              }
              to="/"
            >
              Login
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink
              className={({ isActive }) =>
                `mx-4 ${isActive ? "underline" : ""}`
              }
              to="/createproduct"
            >
              CreateProduct
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `mx-4 ${isActive ? "underline" : ""}`
              }
              to="/listproduct"
            >
              List Product
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `mx-4 ${isActive ? "underline" : ""}`
              }
              to="/getvarient"
            >
              Get Varient
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `mx-4 ${isActive ? "underline" : ""}`
              }
              to="/liststock"
            >
              List Stock
            </NavLink>

            <button
              onClick={() => {
                logout();
              }}
              className="mx-4 px-4 py-2 bg-red-500 rounded text-white"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/createproduct"
          element={user ? <ProductForm /> : <Navigate to="/" />}
        />
        <Route
          path="/getvarient"
          element={user ? <GetVarient /> : <Navigate to="/" />}
        />
        <Route
          path="/listproduct"
          element={user ? <ProductList /> : <Navigate to="/" />}
        />
          <Route
          path="/liststock"
          element={user ? <ListStock /> : <Navigate to="/" />}
        />
        <Route
          path="/subvariant/:subvariantId/addstock"
          element={user ? <AddStock /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
