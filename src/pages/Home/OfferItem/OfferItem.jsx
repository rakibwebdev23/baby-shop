import { useState } from 'react';
import Cart from "../../../components/Cart/Cart";
import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useProducts from "../../../hooks/useProducts";

const OfferItem = () => {
    const [, , offeredProducts] = useProducts();
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 6;
    const pageCount = Math.ceil(offeredProducts.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = offeredProducts.slice(offset, offset + itemsPerPage);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
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
        <Container>
            <SectionTitle title="Offered" subTitle="Item" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {currentItems.map((item) => (
                    <Cart key={item._id} item={item} />
                ))}
            </div>

            {offeredProducts.length > itemsPerPage && (
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageClick({ selected: Math.max(0, currentPage - 1) })}
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
                                        onClick={() => handlePageClick({ selected: page })}
                                        className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? 'bg-[#FF8080] text-white' : 'border hover:bg-gray-50'}`}
                                    >
                                        {page + 1}
                                    </button>
                                )
                            ))}
                        </div>
                        <button
                            onClick={() => handlePageClick({ selected: Math.min(pageCount - 1, currentPage + 1) })}
                            disabled={currentPage === pageCount - 1}
                            className={`px-3 py-1 rounded border ${currentPage === pageCount - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <span className="sm:hidden">→</span>
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default OfferItem;