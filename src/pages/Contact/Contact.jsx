import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from "../../assets/nursery4.jpg"
import { useForm } from 'react-hook-form';
import moment from 'moment';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Contact = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        if (user && user?.email) {
            const contactInfo = {
                name: data.name,
                email: data.email,
                mobileNumber: data.mobile,
                date: data.date,
                time: moment().format('h:mm:ss a'),
                message: data.message
            };

            axiosSecure.post("/contact", contactInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        reset();
                        Swal.fire({
                            title: '<span class="text-3xl font-bold text-gray-800">Thank You! 🎉</span>',
                            html: '<p class="text-lg text-gray-600">Your message has been sent successfully.</p>',
                            icon: 'success',
                            showConfirmButton: true,
                            confirmButtonText: 'Continue',
                            confirmButtonColor: '#059669',
                            timer: 3000,
                            timerProgressBar: true,
                            customClass: {
                                popup: 'rounded-xl shadow-2xl border border-gray-100',
                                title: 'font-bold',
                                htmlContainer: 'py-4',
                                confirmButton: 'text-sm font-medium px-6 py-2.5 rounded-lg',
                                timerProgressBar: 'bg-emerald-500'
                            },
                            showClass: {
                                popup: 'animate__animated animate__fadeInUp animate__faster'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutDown animate__faster'
                            }
                        });
                        navigate("/");
                    }
                });
        } else {
            Swal.fire({
                title: '<span class="text-3xl font-bold text-gray-800">Login Required</span>',
                html: '<p class="text-lg text-gray-600">Please sign in to send your message</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sign In',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#ef4444',
                customClass: {
                    popup: 'rounded-xl shadow-2xl border border-gray-100',
                    title: 'font-bold',
                    htmlContainer: 'py-4',
                    confirmButton: 'text-sm font-medium px-6 py-2.5 rounded-lg',
                    cancelButton: 'text-sm font-medium px-6 py-2.5 rounded-lg'
                },
                showClass: {
                    popup: 'animate__animated animate__fadeInDown animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp animate__faster'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[400px] md:h-[500px] lg:h-[550px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <div className="w-full text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                            Let's Make A <span className="text-[#f96b6b]">Difference</span>
                        </h1>
                        <nav className="flex justify-center md:justify-start items-center space-x-4 sm:space-x-6 text-lg text-white/90">
                            <Link to="/" className="hover:text-[#f97373] transition-all duration-300">Home</Link>
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 hidden sm:block" />
                            <Link to="/shop" className="hover:text-[#f97373] transition-all duration-300">Go to Shop</Link>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 lg:p-12">
                            <div className="max-w-lg">
                                <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>

                                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors duration-200"
                                            placeholder="Your Name"
                                            {...register("name", { required: "Name is required" })} />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors duration-200"
                                                placeholder="your@email.com"
                                                {...register("email", { required: "Email is required" })}

                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors duration-200"
                                                placeholder="+880 "
                                                {...register("mobile", {
                                                    required: "Mobile number is required",
                                                    pattern: {
                                                        value: /^[0-9]{10,15}$/,
                                                        message: "Enter a valid mobile number",
                                                    },
                                                })}
                                            />
                                            {errors.mobile && (
                                                <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Contact Date</label>
                                        <input
                                            type="date"
                                            className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors duration-200"
                                            {...register("date", { required: "Date is required" })}
                                        />
                                        {errors.date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Message</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Write your message here..."
                                            className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors duration-200 resize-y min-h-[120px]"
                                            {...register("message", { required: "Message is required" })}
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#FF8080] hover:bg-[#f97373] text-white py-3 px-4 rounded focus:outline-none font-medium"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* map */}
                        <div className="bg-gray-50 p-8 lg:p-12">
                            <div className="h-[300px] md:h-[400px] bg-white rounded-lg shadow-inner mb-8">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29202.454575285174!2d90.4200192!3d23.8076862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1735211911148!5m2!1sen!2sbd"
                                    className="w-full h-full rounded-lg"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">Visit Our Office</h3>
                                <div className="space-y-4 text-gray-600">
                                    <p className="flex items-center space-x-3">
                                        <span className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center">
                                            <span className="w-2 h-2 bg-[#f97373] rounded-full" />
                                        </span>
                                        <span>Dhaka, Bangladesh</span>
                                    </p>
                                    <p className="flex items-center space-x-3">
                                        <span className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center">
                                            <span className="w-2 h-2 bg-[#f97373] rounded-full" />
                                        </span>
                                        <span>cfbd@gmail.com</span>
                                    </p>
                                    <p className="flex items-center space-x-3">
                                        <span className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center">
                                            <span className="w-2 h-2 bg-[#f97373] rounded-full" />
                                        </span>
                                        <span>+880 1307236959</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;