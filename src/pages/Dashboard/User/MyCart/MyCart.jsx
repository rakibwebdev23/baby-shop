import { useState } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useCartCollection from '../../../../hooks/useCartCollection';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
    const [carts, refetch] = useCartCollection();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const orders = carts.reduce((total, item) => total + item.price, 0);
    const allOrders = orders.toFixed(2);
    const totalPrice = parseFloat(allOrders);

    const onSubmit = async(data) => {
        const cartIds = carts.map(cart => cart._id);
        
        const orderInfo = {
            name: data.name,
            email: user?.email,
            payAmount: totalPrice,
            phoneNumber: data.phone,
            address: data.address,
            cardNumber: data.cardNumber,
            expireDate: data.expireDate,
            cvv: data.cvv,
            details: data.details,
            date: moment().format('MMMM Do YYYY'),
            time: moment().format('h:mm:ss a'),
            cartId: cartIds,
            orderItems: carts.map(item => ({
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image
            }))
        }
        
        try {
            const res = await axiosSecure.post('/payments', orderInfo);
            
            if (res.data.paymentResult.insertedId) {
                setIsCheckoutOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your payment was successful!",
                    text: `${res.data.deleteResult.deletedCount} items have been removed from your cart`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
                navigate("/dashboard/myCart");
            }
        } catch (error) {
            console.error("Payment error:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Payment failed",
                text: "There was an error processing your payment",
                showConfirmButton: true
            });
        }
    }

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
        <div className="min-h-screen bg-gray-100 py-8 relative">
            <div className="container mx-auto px-4">
                <div>
                    <h2 className="text-2xl lg:text-4xl font-semibold text-gray-800 mb-8 text-center">My Carts</h2>
                    <div className="lg:flex justify-between items-center py-6 px-4 text-xl font-semibold bg-[#ff8787] rounded-t-lg text-white">
                        <p>Total Orders: {carts.length}</p>
                        <p>Total Price: ${totalPrice}</p>
                    </div>
                </div>
                <div className="bg-white shadow-xl rounded-t-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#FF8080] bg-opacity-10">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {carts.map((cart, index) => (
                                    <tr key={cart._id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-[#FF8080] font-semibold">{index + 1}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img className="h-12 w-12 rounded-full object-cover" src={cart.image} alt={cart.category_title} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{cart.category}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{cart.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-[#FF8080] font-semibold">
                                            <span className="text-gray-600">$</span> {cart.price}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cart.date} <br />{cart.time}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex justify-center space-x-3">
                                                <button onClick={() => handleDeleteCart(cart._id)} className="text-red-500 hover:text-red-700 transition-colors duration-200" aria-label="Delete">
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
                    <button 
                        onClick={() => setIsCheckoutOpen(true)} 
                        className="text-white text-center font-semibold px-6 py-3 bg-[#B3282D] w-full rounded-md"
                        disabled={carts.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </div>

            {/* overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isCheckoutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsCheckoutOpen(false)}
            />

            {/* sidebar */}
            <div className={`fixed top-0 right-0 w-full lg:w-1/2 h-full bg-white transform transition-transform duration-300 ease-in-out ${isCheckoutOpen ? 'translate-x-0' : 'translate-x-full'} overflow-hidden`}>
                <div className="h-full flex flex-col">
                    {/* header */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-2xl font-semibold text-gray-800">Checkout</h3>
                        <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <FaTimes size={24} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {/* cart items */}
                        <div className="p-6 border-b">
                            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
                            <div className="space-y-4">
                                {carts.map((item) => (
                                    <div key={item._id} className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                            <p className="text-sm font-semibold text-[#FF8080]">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-lg font-semibold mb-4">Payment Details</h4>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Your Name*</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Your name"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number*
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="+8801712345678"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^\+?(?:[0-9] ?){6,14}[0-9]$/,
                                                message: "Enter a valid international phone number (e.g., +8801712345678)",
                                            },
                                        })}
                                    />
                                    {errors.phone && (
                                        <span className="text-red-600 text-sm">{errors.phone.message}</span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Your Address*</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Enter your address"
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && <span className="text-red-600 text-sm">{errors.address.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Additional Details (Optional)</label>
                                    <textarea
                                        {...register("details")}
                                        placeholder="Provide any additional instruction here..."
                                        className="w-full px-3 py-2 border rounded-md resize-none"
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Card Number*</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="1234 5678 9012 3456" 
                                        {...register("cardNumber", { required: "Card number is required" })} 
                                    />
                                    {errors.cardNumber && <span className="text-red-600 text-sm">{errors.cardNumber.message}</span>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Expiry Date*</label>
                                        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="MM/YY" 
                                            {...register("expireDate", { required: "Expire date is required" })} 
                                        />
                                        {errors.expireDate && <span className="text-red-600 text-sm">{errors.expireDate.message}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">CVV*</label>
                                        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="123"
                                            {...register("cvv", { required: "CVV is required" })} 
                                        />
                                        {errors.cvv && <span className="text-red-600 text-sm">{errors.cvv.message}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total Amount</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <input className="w-full bg-[#B3282D] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors" type="submit" value="Complete Purchase" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;