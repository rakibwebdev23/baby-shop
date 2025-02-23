import { FaTrash } from "react-icons/fa";
import useCartCollection from "../../../../hooks/useCartCollection";

const UserHome = () => {
    const [carts, handleDeletecart] = useCartCollection();

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl lg:text-4xl font-semibold text-gray-800 mb-8">All Order Products</h2>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-[#FF8080]">
                        <h2 className="text-3xl font-extrabold text-white text-center">
                            My Carts
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#FF8080] bg-opacity-10">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {carts.map((cart, index) => (
                                    <tr
                                        key={cart._id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-[#FF8080] font-semibold">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img
                                                        className="h-12 w-12 rounded-full object-cover"
                                                        src={cart.image}
                                                        alt={cart.category_title}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {cart.category}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cart.name}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-[#FF8080] font-semibold">
                                            <span className="text-gray-600">$</span> {cart.price}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cart.date} <br />{cart.time}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex justify-center space-x-3">
                                                <button 
                                                    onClick={() => handleDeletecart(cart._id)} 
                                                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                                    aria-label="Delete"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {carts.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No carts found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHome;