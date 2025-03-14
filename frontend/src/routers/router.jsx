import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cartpage from "../pages/Books/CartPage";
import CheckoutPage from "../pages/Books/CheckoutPage";
import Donation from "../pages/donation/donation";
import RentedBooks from "../pages/Books/RentedBooks";
import OrderPage from "../pages/Books/OrderPage";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "../pages/Books/SingleBook";
import AddBook from "../pages/Books/AddBook";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";
import PaymentError from "../pages/Payment/PaymentError";

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
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/rented-books",
        element: <RentedBooks />,
      },
      {
        path: "/rented-books/:id",
        element: <SingleBook />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/failed",
        element: <PaymentFailed />,
      },
      {
        path: "/payment/cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "/payment/error",
        element: <PaymentError />,
      },
    ],
  },
]);

export default router;
