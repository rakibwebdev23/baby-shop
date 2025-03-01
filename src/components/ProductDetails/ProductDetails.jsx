import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "../Container/Container";
import useProducts from "../../hooks/useProducts";
import useCartCollection from "../../hooks/useCartCollection";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const item = useLoaderData();
    const { _id, image, name, price, category, productNumber, description, tags } = item;
    const [products] = useProducts();
    const offeredProducts = products.filter(product => product.category === category);
    const [quantity, setQuantity] = useState(1);
    const [, refetch] = useCartCollection();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);

    // pagination
    const itemsPerPage = 6;
    const pageCount = Math.ceil(offeredProducts.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = offeredProducts.slice(offset, offset + itemsPerPage);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddOrder = () => {
        if (user && user?.email) {
            const cartData = {
                cartId: _id,
                productNumber,
                email: user.email,
                category,
                name,
                image,
                quantity,
                price
            }

            axiosSecure.post("/carts", cartData)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are not Sign In",
                text: "Please Sign In & add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Please! Sign In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }

    const getPageNumbers = () => {
        let pages = [];
        const maxVisiblePages = 5;

        if (pageCount <= maxVisiblePages) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i);
            }
        } else if (currentPage < 2) {
            for (let i = 0; i < 3; i++) {
                pages.push(i);
            }
            pages.push('ellipsis');
            pages.push(pageCount - 1);
        } else if (currentPage >= pageCount - 3) {
            pages.push(0);
            pages.push('ellipsis');
            for (let i = pageCount - 3; i < pageCount; i++) {
                pages.push(i);
            }
        } else {
            pages.push(0);
            pages.push('ellipsis');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push('ellipsis');
            pages.push(pageCount - 1);
        }

        return pages;
    };

    return (
        <Container>
            <div className="mt-10 mb-16">
                <div className="lg:flex gap-8">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <img
                            className="w-full rounded-lg"
                            src={image}
                            alt={name}
                        />
                    </div>
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-2xl lg:text-5xl font-semibold">{name}</h2>
                        <div>
                            <p className="text-xl lg:text-2xl font-semibold flex items-center text-[#ff7272]">
                                $ {price}
                                <span className="text-xs py-1 px-4 bg-gray-500 text-white rounded ml-4">
                                    10% OFF
                                </span>
                            </p>
                        </div>
                        <p className="text-gray-700">{description}</p>

                        {/* order quantity */}
                        <div className="flex items-center space-x-4 mt-6">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    onClick={decrementQuantity}
                                    className="w-10 h-10 flex items-center justify-center text-lg font-bold"
                                >
                                    -
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center border-l border-r border-gray-300">
                                    {quantity}
                                </span>
                                <button
                                    onClick={incrementQuantity}
                                    className="w-10 h-10 flex items-center justify-center text-lg font-bold"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddOrder}
                                className="bg-[#FF8080] hover:bg-[#ff7272] text-white py-2 px-6 rounded transition-colors duration-200 flex-grow md:flex-grow-0"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200 font-medium">
                            <p className="mb-2">SKU: {productNumber}</p>
                            <p className="mb-2">Category: {category}</p>
                            <div className="mb-2 uppercase">Tags: <span className="py-1 px-3 border border-gray-300 mr-1 text-xs text-gray-600">{tags[0]}</span> <span className="py-1 px-3 border border-gray-300 mr-1 text-xs text-gray-600">{tags[1]}</span> <span className="py-1 px-3 border border-gray-300 text-xs text-gray-600">{tags[2]}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* related product section */}
            <div className="my-12">
                <h3 className="text-xl lg:text-4xl font-bold mb-6 text-center"><span className="text-[#ff7272]">You</span> May Also Like</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        currentItems.map((product) => (
                            <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-base lg:text-xl">{product.name}</h4>
                                    <p className="text-xs py-1 px-3 bg-[#FF8080] rounded-tl-md rounded-br-md uppercase text-white">{product.category}</p>
                                </div>
                                <p className="text-[#ff7272] font-bold">${product.price}</p>

                                <div className="flex items-center mt-3 gap-2">
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button onClick={decrementQuantity} className="w-8 h-8 flex items-center justify-center text-sm">-</button>
                                        <span className="w-8 h-8 flex items-center justify-center border-l border-r border-gray-300">{quantity}</span>
                                        <button onClick={incrementQuantity} className="w-8 h-8 flex items-center justify-center text-sm">+</button>
                                    </div>
                                    <button onClick={handleAddOrder} className="bg-[#FF8080] hover:bg-[#ff7272] text-white py-2 px-3 rounded text-sm flex-grow">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                disabled={currentPage === 0}
                                className={`px-3 py-1 rounded border ${currentPage === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                <span className="hidden sm:inline">Previous</span>
                                <span className="sm:hidden">←</span>
                            </button>

                            {/* Page numbers */}
                            <div className="flex items-center gap-1">
                                {getPageNumbers().map((page, index) => (
                                    page === 'ellipsis' ? (
                                        <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? 'bg-[#FF8080] text-white' : 'border hover:bg-gray-50'}`}
                                        >
                                            {page + 1}
                                        </button>
                                    )
                                ))}
                            </div>

                            {/* Next button */}
                            <button
                                onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
                                disabled={currentPage === pageCount - 1}
                                className={`px-3 py-1 rounded border ${currentPage === pageCount - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                <span className="hidden sm:inline">Next</span>
                                <span className="sm:hidden">→</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ProductDetails;