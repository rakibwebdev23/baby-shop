import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import useCartCollection from "../../hooks/useCartCollection";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
    const [carts] = useCartCollection();
    const [isAdmin] = useAdmin();

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-72 bg-orange-400 text-white font-semibold shadow-md">
                <div className="flex items-center justify-center p-6 bg-orange-600">
                    <h2 className="text-2xl font-bold">Baby Shop</h2>
                </div>

                <ul className="menu p-6 space-y-4">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/adminHome" className="flex items-center gap-2 text-white "><FaHome className="text-white" /> Admin Home</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userHome" className="flex items-center gap-2 text-white "><FaHome className="text-white" /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/cart" className="flex items-center gap-2 text-white "><IoCartSharp className="text-white" /> My Cart({cart.length})</NavLink></li>
                        </>
                    )}
                    <div className="divider text-white"></div>
                    <li><NavLink to="/" className="flex items-center gap-2 text-white "><FaHome className="text-white" /> Home</NavLink></li>
                    <li><NavLink to="/shop" className="flex items-center gap-2 text-white "><MdOutlineRestaurantMenu className="text-white" /> Shop</NavLink></li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
