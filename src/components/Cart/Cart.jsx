import { Link } from "react-router-dom";

const Cart = ({ item }) => {
    const { image, name, price, category, productNumber } = item;

    return (
        <div className="group relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-2 left-2 z-10">
                <span className="text-xs bg-white text-[#ff7474] px-2 py-1 rounded-full uppercase">
                    {category}
                </span>
            </div>
            <div className="w-full" style={{ aspectRatio: "1/1" }}>
                <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={name}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-[#FF9B9B] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-all duration-150">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                        <Link to={`/product/${productNumber}`} className="w-1/2">
                            <button className="w-full bg-white hover:bg-gray-50 text-[#ff7474] py-2 rounded-md text-sm font-medium transition-colors">
                                View Details
                            </button>
                        </Link>
                        <Link to="/cart" className="w-1/2">
                            <button className="w-full bg-[#FF8080] hover:bg-[#ff7272] text-white py-2 rounded-md text-sm font-medium transition-colors">
                                Add to Cart
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-3 flex flex-col">
                <div className="flex justify-between items-start">
                    <h2 className="text-base lg:text-xl font-medium text-gray-900 truncate">{name}</h2>
                    <p className="text-xs text-gray-500">#{productNumber}</p>
                </div>
                <p className="mt-2 text-base font-bold text-[#f75f5f]">${price}</p>
            </div>
        </div>
    );
};

export default Cart;