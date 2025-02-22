import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import Products from "../pages/Products/Products";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard/Dashboard";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/products",
                element: <Products></Products>
            },
            {
                path: "/products/:id",
                element: <ProductDetails></ProductDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        errorElement: <Error></Error>,
        children: [
            // user related route 
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            // admin related route 
            {
                path: "adminHome",
                element: <AdminHome></AdminHome>
            },
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            }
        ]
    }
])