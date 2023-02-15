import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [cartArr, setCartArr] = useState([]); //cart array to print the products in the cart
  const [price, setPrice] = useState(0); // price state to display total amount
  let confirm;
  let tempPrice;
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Cart") !== null)) {
      setCartArr(JSON.parse(localStorage.getItem("Cart")));
    }
  }, []);
  // Increase Quantity
  const increaseQuantity = (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        cartArr[i].quantity += 1;
        tempPrice += Number(cartArr[i].quantity) * Number(cartArr[i].price);
        setCartArr([...cartArr]);
        setPrice(tempPrice);
        localStorage.setItem("Cart", JSON.stringify(cartArr));
      }
    }
  };
  // Decrease Quantity
  const decreaseQuantity = (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        if (cartArr[i].quantity > 1) {
          cartArr[i].quantity -= 1;
          tempPrice +=
            price - Number(cartArr[i].quantity) * Number(cartArr[i].price);
          setCartArr([...cartArr]);
          setPrice(tempPrice);
          localStorage.setItem("Cart", JSON.stringify(cartArr));
        } else {
          confirm = window.confirm("Are you sure?");
          if (confirm === true) {
            cartArr.splice(i, 1);
            setCartArr([...cartArr]);
            localStorage.setItem("Cart", JSON.stringify(cartArr));
          } else return;
        }
      }
    }
  };
  // Delete Product from Cart
  const deleteProductFromCart = (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      if (cartArr[i].id === id) {
        confirm = window.confirm("Are you sure ?");
        if (confirm === true) {
          cartArr.splice(i, 1);
          setCartArr([...cartArr]);
          localStorage.setItem("Cart", JSON.stringify(cartArr));
          if (cartArr.length === 0) {
            setPrice(0);
          } else {
            tempPrice += price - cartArr[i].price * cartArr[i].quantity;
            setPrice(tempPrice);
          }
        }
      }
    }
  };
  // UseEffect Hook to display the total amount
  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cartArr.length; i++) {
      temp += cartArr[i].quantity * cartArr[i].price;
    }
    setPrice(temp);
  }, [cartArr, price]);

  return (
    <>
      <div className="card container shadow">
        {/* conditional rendering to print the cart if it has product else display message */}
        {cartArr.length >= 1 ? (
          <table className="table table-hover table-striped">
            <thead style={{ background: "#5c355b", color: "white" }}>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price(Per Unit)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* map function to print the products */}
              {cartArr.map((ele, index) => (
                <tr key={index}>
                  <td>
                    <img src={ele.thumbnail} alt="..." className="cart-image" />
                  </td>
                  <td className="fs-5">{ele.title}</td>
                  <td>
                    <button
                      className="btn btn-warning rounded-pill"
                      onClick={() => increaseQuantity(ele.id)}
                    >
                      +
                    </button>
                    &nbsp;&nbsp;
                    <span className="fs-4">{ele.quantity}</span>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-warning rounded-pill"
                      onClick={() => decreaseQuantity(ele.id)}
                    >
                      -
                    </button>
                  </td>
                  <td className="fs-5">
                    ${Number(ele.price) * Number(ele.quantity)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProductFromCart(ele.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="fs-3 text-center">
                  {" "}
                  Total Amount($) : {price}
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <Link
                    to="/ProductPage"
                    type="button"
                    className="btn btn-secondary"
                  >
                    Continue Shopping
                  </Link>
                </td>
                <td>
                  <Link to="/Bill" type="button" className="btn btn-primary">
                    Checkout
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="text-center m-4">
            <div className="card-body">
              <h5 className="card-title">Please Add Some Item in you cart</h5>
              <Link className="btn btn-warning mt-2" to="/ProductPage">
                Back
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
