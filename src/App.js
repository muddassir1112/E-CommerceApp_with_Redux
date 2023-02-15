import { createContext, useState } from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Cart } from "./component/cart/Cart";
import { CheckOutBill } from "./component/checkout/CheckOutBill";
import { AdminDashboard } from "./component/dashboards/AdminDashboard";
import { ProductPage } from "./component/dashboards/ProductPage";
import { SignIn } from "./component/forms/SignIn";
import { SignUp } from "./component/forms/SignUp";
import { store } from "./redux/store";
export const UserContext = createContext();
function App() {
  // const [role, setRole] = useState("");
  // const [cartProducts, setCartProducts] = useState([])
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Bill" element={<CheckOutBill/>}/>
      </>
    )
  );
  return (
    // <UserContext.Provider value={{ role, setRole, cartProducts, setCartProducts }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    // </UserContext.Provider>
  );
}

export default App;
