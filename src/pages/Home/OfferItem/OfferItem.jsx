import { useState } from 'react';
import ReactPaginate from 'react-paginate';
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

    return (
        <Container>
            <SectionTitle title="Offered" subTitle="Item" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {currentItems.map((item) => (
                    <Cart key={item._id} item={item} />
                ))}
            </div>

            {
                offeredProducts.length > itemsPerPage && (
                <ReactPaginate
                    previousLabel={<span className="text-blue-600 hover:text-blue-800">{"< Previous"}</span>}
                    nextLabel={<span className="text-blue-600 hover:text-blue-800">{"Next >"}</span>}
                    breakLabel={<span className="text-gray-500">...</span>}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex justify-center items-center gap-2 my-6 flex-wrap"}
                    pageClassName={"px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}
                    activeClassName={"bg-blue-600 text-white border-blue-600"}
                    previousClassName={"px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}
                    nextClassName={"px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                    breakClassName={"px-3 py-1 text-gray-500"}
                />
                )
            }
        </Container>
    );
};

export default OfferItem;