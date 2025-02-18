import { Link, useNavigate } from "react-router-dom";
import SocialSign from "../../../component/SocialSign/SocialSign";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
const Register = () => {

    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: loggedUser.displayName,
                            email: loggedUser.email
                        };

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
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
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };
    
    return (
        <div>
            <div className="hero-overlay bg-black bg-opacity-60 w-full min-h-screen flex items-center justify-center px-4">
                <div className="card bg-black bg-opacity-70 p-8 sm:p-12 lg:w-full xl:w-1/2 max-w-screen-xl w-full rounded-xl shadow-xl">
                    <h2 className="text-orange-500 text-3xl sm:text-4xl font-bold text-center mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full p-4 text-black rounded-lg"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full p-4 text-black rounded-lg"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full p-4 text-black rounded-lg"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        message: "Password must have one Uppercase, one Lowercase, and one Special character"
                                    }
                                })}
                            />
                            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input
                                className="relative w-full py-3 text-white border-2 border-transparent bg-orange-600 transition-all duration-300 hover:border-orange-600 hover:bg-transparent hover:text-orange-600 rounded-lg"
                                type="submit"
                                value="Sign Up"
                            />
                        </div>

                        <SocialSign />

                        <p className="text-white mt-2 text-center">
                            Already have an account?{" "}
                            <Link className="text-blue-600 font-bold hover:underline" to="/signin">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;