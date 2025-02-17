import Cart from "../../../components/Cart/Cart";
import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useProducts from "../../../hooks/useProducts";

const OfferItem = () => {
    const [, , offeredProducts] = useProducts();

    return (
        <Container>
            <SectionTitle title="Offered" subTitle="Item"></SectionTitle>
                <div className="lg:grid lg:grid-cols-3 gap-4 justify-center mx-auto">
                    {
                        offeredProducts.map(item => <Cart
                            key={item._id}
                            item={item}
                        ></Cart>)
                    }
                </div>
        </Container>
    );
};

export default OfferItem;

// import React, { useState } from 'react';
// import Cart from "../../../components/Cart/Cart";
// import Container from "../../../components/Container/Container";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import useProducts from "../../../hooks/useProducts";

// const OfferItem = () => {
//     const [, , offeredProducts] = useProducts();
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 6;

//     // Calculate total pages
//     const totalPages = Math.ceil(offeredProducts.length / itemsPerPage);

//     // Get current items
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = offeredProducts.slice(indexOfFirstItem, indexOfLastItem);

//     // Generate page numbers
//     const getPageNumbers = () => {
//         const pages = [];
        
//         // Always show first page
//         pages.push(1);
        
//         if (currentPage > 3) {
//             pages.push('...');
//         }
        
//         // Show pages around current page
//         for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
//             pages.push(i);
//         }
        
//         if (currentPage < totalPages - 2) {
//             pages.push('...');
//         }
        
//         // Always show last page if there's more than one page
//         if (totalPages > 1) {
//             pages.push(totalPages);
//         }
        
//         return pages;
//     };

//     return (
//         <Container>
//             <SectionTitle title="Offered" />
            
//             {/* Responsive Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//                 {currentItems.map(item => (
//                     <Cart
//                         key={item._id}
//                         item={item}
//                     />
//                 ))}
//             </div>

//             {/* Pagination - Only show if there are more than 6 items */}
//             {offeredProducts.length > itemsPerPage && (
//                 <div className="flex justify-center items-center gap-2 my-6">
//                     {/* Previous Button */}
//                     <button
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className={`px-3 py-1 rounded border ${
//                             currentPage === 1 
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                             : 'bg-white text-gray-700 hover:bg-gray-50'
//                         }`}
//                     >
//                         Prev
//                     </button>

//                     {/* Page Numbers */}
//                     {getPageNumbers().map((pageNum, index) => (
//                         <button
//                             key={index}
//                             onClick={() => pageNum !== '...' && setCurrentPage(pageNum)}
//                             className={`px-3 py-1 rounded border ${
//                                 pageNum === currentPage
//                                     ? 'bg-blue-600 text-white'
//                                     : pageNum === '...'
//                                     ? 'cursor-default'
//                                     : 'bg-white hover:bg-gray-50'
//                             }`}
//                         >
//                             {pageNum}
//                         </button>
//                     ))}

//                     {/* Next Button */}
//                     <button
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className={`px-3 py-1 rounded border ${
//                             currentPage === totalPages
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                             : 'bg-white text-gray-700 hover:bg-gray-50'
//                         }`}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default OfferItem;