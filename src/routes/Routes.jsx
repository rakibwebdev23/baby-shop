import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import Products from "../pages/Products/Products";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";
import MyCart from "../pages/Dashboard/User/MyCart/MyCart";

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
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },
            {
                path: "myCart",
                element: <MyCart></MyCart>
            }
        ]
    }
])