import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../redux/AppSlice";
// import { Navbar } from "../navbar/Navbar";

export const SignUp = () => {
  const navigate = useNavigate(); //useNavigate Hook
  const dispatch = useDispatch(); //useDispatch Hook
  const [alertBox, setAlertBox] = useState("none"); //to show/hide alert box
  const [alertMsg, setAlertMsg] = useState(""); // alert message
  // refs for input boxes
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  // regex for email validation
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // function to handle sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    if (validation()) {
      let obj = {
        id: Math.floor(Math.random() * 100000),
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        mobile: mobileRef.current.value,
        role: roleRef.current.value,
      };
      dispatch(addUser(obj));
      navigate("/SignIn");
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      mobileRef.current.value = "";
      roleRef.current.value = "";
    }
  };
  // validation function
  const validation = () => {
    if (nameRef.current.value === "" || !isNaN(nameRef.current.value)) {
      setAlertBox("block");
      setAlertMsg("Please enter your name !!!");
      return false;
    } else if (
      !emailRef.current.value.match(mailformat) ||
      emailRef.current.value === ""
    ) {
      setAlertBox("block");
      setAlertMsg("Please enter valid email !!!");
      return false;
    } else if (
      isNaN(mobileRef.current.value) ||
      mobileRef.current.value === "" ||
      mobileRef.current.value.length < 10
    ) {
      setAlertBox("block");
      setAlertMsg("Please enter valid mobile number !!!");
      return false;
    } else if (
      passwordRef.current.value === "" ||
      passwordRef.current.value < 10
    ) {
      setAlertBox("block");
      setAlertMsg("Please enter password of atleast 10 characters !!!");
      return false;
    } else if (roleRef.current.value === "") {
      setAlertBox("block");
      setAlertMsg("Please choose your role !!!");
      return false;
    } else return true;
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          marginTop: "-4px",
          background: "#efe4ee",
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <div
          className="card m-auto p-3 mt-1 shadow"
          style={{ width: "50%", background: "#ededed" }}
        >
          <h3 className="mb-4 text-center">
            {" "}
            <i className="fas fa-sign-in-alt"></i>&nbsp;Create An Account{" "}
          </h3>
          <form className="row g-3">
            <div className="form-floating mb-3 col-md-6">
              <input
                autoFocus
                type="text"
                className="form-control"
                ref={nameRef}
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                <i className="fas fa-user-alt"></i>&nbsp;Name
              </label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="email"
                className="form-control"
                ref={emailRef}
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                <i className="fas fa-envelope-open"></i>&nbsp;Email
              </label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                ref={mobileRef}
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                <i className="fas fa-mobile"></i>&nbsp;Mobile
              </label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="password"
                className="form-control"
                ref={passwordRef}
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                <i className="fas fa-key"></i>&nbsp;Password
              </label>
            </div>
            <div className="form-floating">
              <select
                className="form-select"
                ref={roleRef}
                aria-label="Floating label select example"
              >
                <option value="--Select--">Open this select menu</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
              <label htmlFor="floatingSelect">
                <i className="fas fa-tasks"></i>&nbsp;Choose your role
              </label>
            </div>
            {/* Alert Box Open */}
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
              style={{ display: alertBox }}
            >
              <strong>Ooopss !!!</strong>&nbsp;{alertMsg}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            {/* Alert Box Close */}
            <div className="d-grid gap-2">
              <button
                className="btn btn-success btn-lg text-white"
                type="button"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
            <div className="">
              <p>
                Already a user ? <Link to="/SignIn">Click here to login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
