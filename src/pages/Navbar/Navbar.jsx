import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import useCartCollection from "../../hooks/useCartCollection";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [carts] = useCartCollection();
    
    const navlinks = <>
        <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
        <li><Link to="/products" className="hover:text-gray-600">Shop</Link></li>
        <li><Link to="/about" className="hover:text-gray-600">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-gray-600">Contact</Link></li>
    </>;

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    };

    return (
        <div className="bg-white/90 shadow py-4 w-full">
            <Container>
                <div className="navbar text-black">
                    {/* Mobile Menu */}
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navlinks}
                            </ul>
                        </div>
                        <Link to="/" className="lg:w-24 w-12"><img src={logo} alt="" /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal gap-4">
                            {navlinks}
                        </ul>
                    </div>

                    {/* Navbar End (e.g., Cart, Login) */}
                    <div className="navbar-end gap-2">
                        <div>
                            {user && <Link to="/cart" className="btn btn-ghost hover:bg-gray-100 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="absolute top-0 right-0 bg-[#FF8080] text-white text-xs rounded-full p-1">{carts.length}</span>
                            </Link>}
                        </div>
                        {
                            user ? <>
                                <Link onClick={() => handleLogOut()} className="py-2 px-4 lg:px-6 rounded ml-2 bg-[#FF8080] text-white hover:bg-[#f97373]">Log Out</Link>
                                {user.photoURL && (
                                    <div className="avatar ml-4">
                                        <div className="w-12 rounded-full">
                                            <img src={user.photoURL} alt="User Avatar" />
                                        </div>
                                    </div>
                                )}
                            </> : <Link to="/login" className="py-2 px-4 lg:px-6 rounded ml-2 bg-[#FF8080] text-white hover:bg-[#f97373]">Login</Link>
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;