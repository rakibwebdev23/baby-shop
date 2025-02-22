import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import logo from "../../assets/logo.png";

const Footer = () => {
    const socialLinks = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
            ),
            url: "#",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
            ),
            url: "#",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            url: "#",
        },
    ];

    return (
        <footer className="bg-gradient-to-b from-white to-pink-50">
            {/* Main Footer Content */}
            <div className="pt-16 pb-8">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-4">
                            <Link to="/" className="block mb-6">
                                <img src={logo} alt="Baby Shop Logo" className="h-16" />
                            </Link>
                            <p className="text-gray-600 mb-6">
                                Creating magical moments for your little ones. Discover our curated collection of baby essentials, toys, and clothing.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#FF8080] hover:bg-[#FF8080] hover:text-white transition-colors duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Shop Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Shop</h3>
                            <ul className="space-y-3">
                                <li><Link to="/products/new" className="text-gray-600 hover:text-[#FF8080]">New Arrivals</Link></li>
                                <li><Link to="/products/bestsellers" className="text-gray-600 hover:text-[#FF8080]">Best Sellers</Link></li>
                                <li><Link to="/products/clothing" className="text-gray-600 hover:text-[#FF8080]">Baby Clothing</Link></li>
                                <li><Link to="/products/toys" className="text-gray-600 hover:text-[#FF8080]">Toys</Link></li>
                            </ul>
                        </div>

                        {/* Support Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Support</h3>
                            <ul className="space-y-3">
                                <li><Link to="/faq" className="text-gray-600 hover:text-[#FF8080]">FAQs</Link></li>
                                <li><Link to="/shipping" className="text-gray-600 hover:text-[#FF8080]">Shipping Info</Link></li>
                                <li><Link to="/returns" className="text-gray-600 hover:text-[#FF8080]">Returns</Link></li>
                                <li><Link to="/size-guide" className="text-gray-600 hover:text-[#FF8080]">Size Guide</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter Section */}
                        <div className="lg:col-span-4">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Join Our Family</h3>
                            <p className="text-gray-600 mb-4">Subscribe for exclusive offers, parenting tips, and new arrivals!</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF8080]"
                                />
                                <button className="px-6 py-2 rounded-full bg-[#FF8080] text-white hover:bg-[#f97373] transition-colors duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100 bg-white/80">
                <Container>
                    <div className="py-6 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
                        <div className="flex flex-wrap justify-center gap-4 mb-4 sm:mb-0">
                            <Link to="/privacy" className="hover:text-[#FF8080]">Privacy Policy</Link>
                            <span>•</span>
                            <Link to="/terms" className="hover:text-[#FF8080]">Terms of Service</Link>
                            <span>•</span>
                            <Link to="/sitemap" className="hover:text-[#FF8080]">Sitemap</Link>
                        </div>
                        <p>© {new Date().getFullYear()} Baby Shop. All rights reserved.</p>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;