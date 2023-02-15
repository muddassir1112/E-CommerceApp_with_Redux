import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/AppSlice";
import userImage from "../../images/user.png";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const state = useSelector((state) => state.eCommerceApp);
  const dispatch = useDispatch();
  // function to delete user from the records
  const deleteUsers = (id) => {
    let confirm = window.confirm("Are you sure?");
    if (confirm === true) {
      dispatch(deleteUser(id));
    } else return;
  };
  return (
    <>
      <div className="row">
        <div
          className="col-md-2"
          style={{ background: "#212529", lineHeight: "3.1" }}
        >
          <div className="text-center">
            <img
              className="mt-2"
              src={userImage}
              alt="..."
              style={{ height: "85px", width: "85px" }}
            />
          </div>
          <h3 className="text-white text-center mt-2">Hello Admin !</h3>
          {/* DashBoard Side Panel */}
          <table className="table table-dark table-striped table-hover">
            <tbody>
              <tr>
                <td>
                  <i className="material-icons">dashboard</i> &nbsp;Dashboard
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fas fa-users"></i>&nbsp;Customers
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fas fa-list-alt"></i>&nbsp;Category
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fas fa-align-right"></i>&nbsp;Sizes
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fab fa-product-hunt"></i>&nbsp;Products
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fab fa-first-order"></i>&nbsp;Orders
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-6 col-md-10">
          {/* SignOut */}
          <div className="bg-dark p-2" style={{ textAlign: "right" }}>
            <Link to="/">
              {" "}
              <i className="fas fa-sign-in-alt fs-3 text-white me-4"></i>
            </Link>
          </div>
          {/* Users Table */}
          <div className="card shadow mt-1">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
                {state.users.map((ele, index) => (
                  <tr key={index}>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.mobile}</td>
                    <td>{ele.role}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUsers(ele.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
