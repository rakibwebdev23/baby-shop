import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useCartCollection from "../../hooks/useCartCollection";

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
                price
            }

            axiosSecure.post("/carts", cartData)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-center",
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
        <div className="group relative border border-gray-200 bg-white hover:shadow-md p-2">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                <img className="h-48 w-full object-cover rounded-t-md" src={image} alt={name} loading="lazy" />
                <div className="absolute inset-0 bg-pink-300/40 opacity-0 group-hover:opacity-100">
                    <button onClick={handleAddOrder} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF8080] hover:bg-[#f45e5e] px-4 py-2 text-sm font-medium text-white rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="p-3 text-center">
                <p className="text-xs text-gray-500 uppercase">{category}</p>
                <p className="text-xs text-gray-400 mt-1">#{productNumber}</p>
                <h2 className="mt-1 text-sm lg:text-xl font-medium text-gray-900 truncate">{name}</h2>
                <p className="mt-1 text-sm font-bold text-[#ff7272]">$ {price}</p>
            </div>
        </div>
    );
};
export default ProductCart;