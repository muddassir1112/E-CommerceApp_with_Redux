import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../redux/AppSlice";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "../cart/Cart";
import { deleteSearch, handleSearch } from "../../redux/AppSlice";
// import { UserContext } from "../../App";

export const Navbar = () => {
  const state = useSelector((state) => state.eCommerceApp); //useSelector hook to get the searched array
  const [role, setRole] = useState(""); //role state to get the role of user
  const [searchedInput, setSearchedInput] = useState(""); //state to get the search input
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect hook is used to get the user role
  useEffect(() => {
    let temp = JSON.parse(sessionStorage.getItem("user"));
    for (let i = 0; i < temp.length; i++) {
      setRole(temp[i].role);
    }
  }, []);
  // method to get the search input
  const handleSearchInput = (e) => {
    setSearchedInput(e.target.value);
  };
  // function to search the products
  const handleSearchProducts = (e) => {
    e.preventDefault();
    let startsWithAlphabet = searchedInput.toUpperCase();
    if (state.searchedArray !== undefined) {
      dispatch(deleteSearch());
      for (var i = 0; i < state.products.products.length; i++) {
        if (
          state.products.products[i].title
            .toUpperCase()
            .includes(startsWithAlphabet)
        ) {
          dispatch(handleSearch(state.products.products[i]));
          setSearchedInput("");
        }
      }
    }
  };
  // function to logout form the product page
  const handleLogout = () => {
    localStorage.removeItem("Cart");
    dispatch(deleteSearch());
    navigate("/");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-sm"
        style={{ background: "#efe4ee" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#0">
            <img
              src={logo}
              alt="..."
              style={{ height: "85px", width: "150px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span
              className="navbar-toggler-icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to open navbar"
              style={{ background: "#5c355b" }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Contacts
                </a>
              </li>
              {role === "User" ? (
                <li
                  className="nav-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Cart"
                >
                  <Link className="nav-link fs-5" to="/Cart" type="button">
                    Cart<i className="fas fa-shopping-cart"></i>
                    {JSON.parse(localStorage.getItem("Cart")) !== null
                      ? JSON.parse(localStorage.getItem("Cart")).length
                      : 0}
                  </Link>
                </li>
              ) : null}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                style={{ borderColor: "#5c355b" }}
                type="text"
                placeholder="Search products by name..."
                value={searchedInput}
                onChange={handleSearchInput}
              />
              <button
                className="btn text-white"
                style={{ background: "#5c355b" }}
                type="button"
                onClick={handleSearchProducts}
              >
                Search
              </button>
              {/* Logout Button */}
              <button
                className="btn float-end ms-2 logout-btn"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Log out"
                type="button"
                onClick={handleLogout}
                style={{ background: "#ba87b9", color: "white" }}
              >
                <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <hr></hr>
    </>
  );
};
