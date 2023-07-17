import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/AppSlice";
import { Navbar } from "../navbar/Navbar";

export const ProductPage = () => {
  const state = useSelector((state) => state.eCommerceApp.products.products); //useSelector Hook is used t get the product array
  const inputSearch = useSelector((state) => state.eCommerceApp); //to handle loading
  const [productsArr, setProductsArr] = useState([]); //to diplay the products
  const [cartArr, setCartArr] = useState([]); //to set the items in local storage that are added to the cart
  const [stock, setStock] = useState(""); //to get the updated stock value
  const [role, setRole] = useState(""); //to get the role of user for conditional rendering
  const dispatch = useDispatch(); //useDispatch hook
  //refs for selecting the options for sorting
  const select1Ref = useRef();
  const select2Ref = useRef();
  //useEffect Hook is used to get the cart items and role of user
  useEffect(() => {
    let temp = JSON.parse(sessionStorage.getItem("user"));
    dispatch(fetchProducts());
    if (JSON.parse(localStorage.getItem("Cart")) !== null) {
      setCartArr(JSON.parse(localStorage.getItem("Cart")));
    }
    for (let i = 0; i < temp.length; i++) {
      setRole(temp[i].role);
    }
  }, []);
  // useEffect to show the products in the display page
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Products")) !== null) {
      setProductsArr(JSON.parse(localStorage.getItem("Products")));
    } else if (state !== undefined) {
      for (let i = 0; i < state.length; i++) {
        let obj = {
          id: state[i].id,
          title: state[i].title.toUpperCase(),
          category: state[i].category.toUpperCase(),
          description: state[i].description,
          price: state[i].price,
          rating: state[i].rating,
          stock: state[i].stock,
          thumbnail: state[i].thumbnail,
          quantity: 1,
        };
        productsArr.push(obj);
      }
      setProductsArr([...productsArr]);
      localStorage.setItem("Products", JSON.stringify(productsArr));
    }
  }, [state]);
  // function to update stock
  const handleUpdateStock = (id) => {
    productsArr.forEach((ele) => {
      if (ele.id === id) {
        ele.stock = stock;
        setProductsArr([...productsArr]);
        localStorage.setItem("Products", JSON.stringify(productsArr));
      }
    });
    setStock("");
  };
  // function to handle product add to cart
  const handleAddToCart = (item) => {
    let tempCartArr = JSON.parse(localStorage.getItem("Cart"));
    if (tempCartArr === null) {
      cartArr.push(item);
      setCartArr([...cartArr]);
      localStorage.setItem("Cart", JSON.stringify(cartArr));
    } else {
      for (let i = 0; i < tempCartArr.length; i++) {
        if (item.id === tempCartArr[i].id) {
          alert("Item already in the cart");
          return;
        }
      }
      cartArr.push(item);
      setCartArr([...cartArr]);
      localStorage.setItem("Cart", JSON.stringify(cartArr));
    }
  };
  // function to sort the product array
  const handleSort = (e) => {
    let newArr;
    if (
      select1Ref.current.value === "price" &&
      select2Ref.current.value === "LowToHigh"
    ) {
      newArr = productsArr.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (
      select1Ref.current.value === "price" &&
      select2Ref.current.value === "HighToLow"
    ) {
      newArr = productsArr.sort((b, a) => Number(a.price) - Number(b.price));
    } else if (
      select1Ref.current.value === "rating" &&
      select2Ref.current.value === "LowToHigh"
    ) {
      newArr = productsArr.sort((a, b) => Number(a.rating - b.rating));
    } else if (
      select1Ref.current.value === "rating" &&
      select2Ref.current.value === "HighToLow"
    ) {
      newArr = productsArr.sort((b, a) => Number(a.rating - b.rating));
    }
    setProductsArr([...newArr]);
    select1Ref.current.value = "--Sort By--";
    select2Ref.current.value = "--Order--";
  };
  // Clear Filter
  const clearFilter = () => {
    setProductsArr([...JSON.parse(localStorage.getItem("Products"))]);
  };
  return (
    <>
      <Navbar />
      {/* Loader */}
      {inputSearch.loading === "block" ? (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div
            className="spinner-grow"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : null}
      {/* Filter Area */}
      <div className="row p-3" style={{ background: "#f2edf2" }}>
        <div className="col-md-2">
          <select
            className="form-select"
            aria-label="Default select example"
            ref={select1Ref}
            style={{ borderColor: "#844f82" }}
          >
            <option value="--Sort By--">--Sort by--</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            aria-label="Default select example"
            ref={select2Ref}
            style={{ borderColor: "#844f82" }}
          >
            <option value="--Order--">--Order--</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        </div>
        <div className="col-md-6">
          <button
            className="btn"
            style={{ background: "#844f82", color: "white" }}
            onClick={handleSort}
          >
            Sort
          </button>
          <button className="btn btn-warning ms-4" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>
      </div>
      {/* Searched Product Array */}
      <div className="row row-cols-1 row-cols-md-4 g-4 p-2">
        {inputSearch.searchedArray !== undefined
          ? inputSearch.searchedArray.map((ele, index) => (
              <>
                <div className="col" key={index}>
                  <div className="card h-100 shadow">
                    <img
                      src={ele.thumbnail}
                      className="card-img-top product-image"
                      alt="..."
                    />
                    <div className="card-body" style={{ textAlign: "center" }}>
                      <h5 className="card-title" style={{ color: "#5c355b" }}>
                        {ele.title}
                      </h5>
                      <p className="card-text">{ele.category}</p>
                      <p className="card-text fw-bold">Price : ${ele.price}</p>
                      <p className="card-text">Available Stock : {ele.stock}</p>
                      <p className="card-text">
                        Ratings : {ele.rating}{" "}
                        <i
                          className="fas fa-star"
                          style={{ color: "#f2af0e" }}
                        ></i>
                      </p>
                    </div>
                    <div className="card-footer">
                      {role === "User" ? (
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => handleAddToCart(ele)}
                          >
                            Add to cart
                          </button>
                        </div>
                      ) : role === "Manager" ? (
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Update Stock"
                            //   aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            // value={quantity}
                            onChange={(e) => setStock(e.target.value)}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={() => handleUpdateStock(ele.id)}
                          >
                            Update Stock
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ))
          : null}
      </div>
      <hr></hr>
      {/* Product Page */}
      <div className="row row-cols-1 row-cols-md-4 g-4 p-2">
        {productsArr !== undefined
          ? productsArr.map((ele, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow">
                  <img
                    src={ele.thumbnail}
                    className="card-img-top product-image"
                    alt="..."
                  />
                  <div className="card-body" style={{ textAlign: "center" }}>
                    <h5 className="card-title" style={{ color: "#5c355b" }}>
                      {ele.title}
                    </h5>
                    <p className="card-text">{ele.category}</p>
                    <p className="card-text fw-bold">Price : ${ele.price}</p>
                    <p className="card-text">Available Stock : {ele.stock}</p>
                    <p className="card-text">
                      Ratings : {ele.rating}{" "}
                      <i
                        className="fas fa-star"
                        style={{ color: "#f2af0e" }}
                      ></i>
                    </p>
                  </div>
                  <div className="card-footer">
                    {role === "User" ? (
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleAddToCart(ele)}
                        >
                          Add to cart
                        </button>
                      </div>
                    ) : role === "Manager" ? (
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Update Stock"
                          aria-describedby="button-addon2"
                          onChange={(e) => setStock(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          id="button-addon2"
                          onClick={() => handleUpdateStock(ele.id)}
                        >
                          Update Stock
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};
