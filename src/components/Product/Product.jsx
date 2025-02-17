import { useState } from 'react';
import ProductCart from '../ProductCart/ProductCart';

const Product = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 9;

    const pageCount = Math.ceil(items.length / productsPerPage);
    const offset = currentPage * productsPerPage;
    const currentProducts = items.slice(offset, offset + productsPerPage);

    const handlePageClick = (page) => {
        if (page >= 0 && page < pageCount) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 mb-10">
                {currentProducts.map((item) => (
                    <ProductCart key={item._id} item={item} />
                ))}
            </div>

            {/* Pagination */}
            {items.length > productsPerPage && (
                <div className="flex justify-center items-center gap-2 my-6">
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {[...Array(pageCount)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index)}
                            className={`px-4 py-2 rounded border ${currentPage === index
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === pageCount - 1}
                        className="px-4 py-2 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;