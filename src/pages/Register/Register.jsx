import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SocialSign from "../../components/SocialSign/SocialSign";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: loggedUser.displayName,
                            email: loggedUser.email,
                        };

                        axiosPublic.post("/users", userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: "Good job!",
                                        text: "You have successfully registered!",
                                        icon: "success",
                                    });
                                    navigate("/");
                                }
                            });
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <div className="bg-base-200 flex items-center justify-center py-16">
                <div className="bg-white w-96 p-8 rounded shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="form-control relative">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        message: "Password must have one Uppercase, one Lowercase, and one Special character",
                                    },
                                })}
                            />
                            <span
                                className="absolute right-3 top-10 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye/>  : <FaEyeSlash/>}
                            </span>
                            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input
                                className="w-full bg-[#FF8080] hover:bg-[#f97373] text-white py-2 px-4 rounded focus:outline-none font-medium"
                                type="submit"
                                value="Register"
                            />
                        </div>

                        <SocialSign />

                        <p className="text-gray-600 text-sm text-center">
                            Already have an account?{" "}
                            <a href="/login" className="text-[#B3282D]">
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;