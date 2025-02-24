import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useCartCollection from "../../../../hooks/useCartCollection";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [carts, refetch] = useCartCollection();
    const axiosSecure = useAxiosSecure();

    const orders = carts.reduce((total, item) => total + item.price, 0);
    const allOrders = orders.toFixed(2);
    const totalOrders = parseFloat(allOrders);

    const handleDeleteCart = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/carts/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div>
                    <h2 className="text-2xl lg:text-4xl font-semibold text-gray-800 mb-8 text-center">My Carts</h2>
                    <div className="lg:flex justify-between items-center py-6 px-4 text-xl font-semibold bg-[#ff8787] rounded-t-lg text-white">
                        <p>Total Orders: {carts.length}</p>
                        <p>Total Price: ${totalOrders}</p>
                    </div>
                </div>
                <div className="bg-white shadow-xl rounded-t-lg overflow-hidden">

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
                                                    onClick={() => handleDeleteCart(cart._id)}
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
                    <button className="text-white text-center font-semibold px-6 py-3 bg-[#B3282D] w-full rounded-md">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCart;