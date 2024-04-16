import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Layout from "../layout/Layout";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Private from "../routers/Private";
import Activated from "../pages/home/active";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Private><Home /></Private>,
      },
      {
        path: "/activate/:token",
        element: <Private><Activated /></Private>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
