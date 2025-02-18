import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import SocialSign from "../../components/SocialSign/SocialSign";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                reset();
                Swal.fire({
                    title: "Good job !",
                    text: "You you have successfully login !",
                    icon: "success",
                });
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="bg-base-200 flex items-center justify-center py-16">
            <div className="bg-white w-96 p-8 rounded shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    <div className="form-control">
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                    </div>

                    <div className="form-control mt-6">
                        <input
                            className="w-full bg-[#FF8080] hover:bg-[#f97373] text-white py-2 px-4 rounded font-medium"
                            type="submit"
                            value="Login"
                        />
                    </div>

                    <SocialSign />

                    <p className="text-gray-600 text-sm text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-[#B3282D]">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;