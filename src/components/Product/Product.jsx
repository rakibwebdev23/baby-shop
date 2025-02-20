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
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 mb-10">
                {currentProducts.map((item) => (
                    <ProductCart key={item._id} item={item} />
                ))}
            </div>

            {/* pagination */}
            {items.length > productsPerPage && (
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage === 0}
                            className={`px-3 py-1 rounded border ${currentPage === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">←</span>
                        </button>
                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, index) => (
                                page === 'ellipsis' ? (
                                    <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => handlePageClick(page)}
                                        className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? 'bg-[#FF8080] text-white' : 'border hover:bg-gray-50'}`}
                                    >
                                        {page + 1}
                                    </button>
                                )
                            ))}
                        </div>
                        <button
                            onClick={() => handlePageClick(currentPage + 1)}
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
    );
};

export default Product;