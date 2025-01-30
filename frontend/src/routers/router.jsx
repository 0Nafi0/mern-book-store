import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";

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
        path: "/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/register",
        element: <Register/>
      }
    ],
  },
]);

export default router;
