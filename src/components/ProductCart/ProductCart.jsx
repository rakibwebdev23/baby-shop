import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCartCollection from "../../hooks/useCartCollection";
import moment from "moment";

const ProductCart = ({ item }) => {
    const { image, name, price, category, productNumber, _id } = item;
    const [, refetch] = useCartCollection();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddOrder = () => {
        if (user && user?.email) {
            const cartData = {
                cartId: _id,
                productNumber,
                email: user.email,
                category,
                name,
                image,
                price,
                date: moment().format('MMMM Do YYYY'),
                time: moment().format('h:mm:ss a'),
            }

            axiosSecure.post("/carts", cartData)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Sign In",
                text: "Please Sign In & add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Please! Sign In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="group relative border border-gray-200 bg-white hover:shadow-md lg:p-2">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                <Link to={`/products/${_id}`}>
                    <img className="h-48 w-full object-cover rounded-t-md" src={image} alt={name} loading="lazy" />
                </Link>
            </div>
            <div className="p-3 text-center">
                <p className="text-xs text-gray-500 uppercase">{category}</p>
                <p className="text-xs text-gray-400 mt-1">#{productNumber}</p>
                <h2 className="mt-1 text-sm lg:text-xl font-medium text-gray-900 truncate">{name}</h2>
                <div className="h-8 flex items-center justify-center">
                    {/* visible on mobile but hidden on desktop  */}
                    <p className="text-sm font-bold text-[#ff7272] md:group-hover:hidden">$ {price}</p>
                    <button
                        onClick={handleAddOrder}
                        className="hidden md:group-hover:block px-4 py-1 text-sm font-medium text-white bg-[#FF8080] hover:bg-[#f45e5e] rounded"
                    >
                        Add to Cart
                    </button>
                </div>

                <div className="mt-2 md:hidden">
                    <button
                        onClick={handleAddOrder}
                        className="px-4 py-1 text-sm font-medium text-white bg-[#FF8080] hover:bg-[#f45e5e] rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;