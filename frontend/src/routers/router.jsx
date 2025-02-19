import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cartpage from "../pages/Books/CartPage";
import CheckoutPage from "../pages/Books/CheckoutPage";
import SingleBook from "../pages/Books/SingleBook";
import Donation from "../pages/donation/donation";
import RentedBooks from "../pages/Books/RentedBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donation",
        element: <Donation />,
      },
      {
        path: "/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cartpage />,
      },
      {
        path: "/checkout",
        element:  <PrivateRoute><CheckoutPage/></PrivateRoute>,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/rented_books",
        element: <RentedBooks />
      }
    ],
  },
]);

export default router;
