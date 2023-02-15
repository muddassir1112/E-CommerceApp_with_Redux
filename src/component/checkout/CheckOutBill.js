import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckOutBill = () => {
  const [cartArr, setCartArr] = useState([]); //array state to print the products
  const [price, setPrice] = useState(0);
  //useNavigate Hook
  const navigate = useNavigate();
  //date method to print the date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  //useeffect Hook is used to get the element form local storage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Cart") !== null)) {
      setCartArr(JSON.parse(localStorage.getItem("Cart")));
    }
  }, []);
  // useEffect hook is used to calculate the total amount
  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cartArr.length; i++) {
      temp += cartArr[i].quantity * cartArr[i].price;
    }
    setPrice(temp);
  }, [cartArr, price]);
  // function for successfully placed order
  const handlePlaceOrder = () => {
    alert("Thank you for the shopping");
    navigate("/ProductPage");
    localStorage.removeItem("Cart");
  };
  // method to print bill
  const printBill = () => {
    window.print();
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="container mb-5 mt-3">
          <div className="row d-flex align-items-baseline">
            <div className="col-xl-9">
              <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                Invoice <strong>ID: #123-123</strong>
              </p>
            </div>
            <div className="col-xl-3 float-end">
              <a
                href="#0"
                className="btn btn-light text-capitalize border-0"
                data-mdb-ripple-color="dark"
                onClick={printBill}
              >
                <i className="fas fa-print text-primary"></i> Print
              </a>
              <a
                href="#0"
                className="btn btn-light text-capitalize"
                data-mdb-ripple-color="dark"
              >
                <i className="far fa-file-pdf text-danger"></i> Export
              </a>
            </div>
            <hr />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xl-8">
                <ul className="list-unstyled">
                  <li className="text-muted">
                    To:{" "}
                    <span style={{ color: "#5d9fc5" }}>Muddassir Ansari</span>
                  </li>
                  <li className="text-muted">Street, City</li>
                  <li className="text-muted">State, Country</li>
                  <li className="text-muted">
                    <i className="fas fa-phone"></i> 123-456-789
                  </li>
                </ul>
              </div>
              <div className="col-xl-4">
                <p className="text-muted">Invoice</p>
                <ul className="list-unstyled">
                  <li className="text-muted">
                    <i
                      className="fas fa-circle"
                      style={{ color: "#84B0CA" }}
                    ></i>{" "}
                    <span className="fw-bold">ID:</span>#123-456
                  </li>
                  <li className="text-muted">
                    <i
                      className="fas fa-circle"
                      style={{ color: "#84B0CA" }}
                    ></i>{" "}
                    <span className="fw-bold">Creation Date: </span>
                    {currentDate}
                  </li>
                  <li className="text-muted">
                    <i
                      className="fas fa-circle"
                      style={{ color: "#84B0CA" }}
                    ></i>{" "}
                    <span className="me-1 fw-bold">Status:</span>
                    <span className="badge bg-warning text-black fw-bold">
                      Unpaid
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Bill Details */}
            <div className="row my-2 mx-1 justify-content-center">
              <table className="table table-striped table-borderless">
                <thead
                  style={{ backgroundColor: "#5c355b" }}
                  className="text-white"
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map function to print the bill details */}
                  {cartArr.map((ele, index) => (
                    <tr key={index}>
                      <th scope="row">{ele.id}</th>
                      <td>{ele.title}</td>
                      <td>{ele.quantity}</td>
                      <td>${ele.price}</td>
                      <td>${Number(ele.price) * Number(ele.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Bill Details Closed */}
            <div className="row">
              <div className="col-xl-8">
                <p className="ms-3">
                  Add additional notes and payment information
                </p>
              </div>
              <div className="col-xl-3">
                <ul className="list-unstyled">
                  <li className="text-muted ms-3">
                    <span className="text-black me-4">Total</span>
                    {price}
                  </li>
                </ul>
                <p className="text-black float-start">
                  <span className="text-black me-3"> Total Amount</span>
                  <span style={{ fontSize: "25px" }}>${price}</span>
                </p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xl-10">
                <p>Thank you for your purchase</p>
              </div>
              <div className="col-xl-2">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
                  style={{ backgroundColor: "#5c355b" }}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
