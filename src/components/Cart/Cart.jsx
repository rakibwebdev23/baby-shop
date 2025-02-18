const Cart = ({ item }) => {
    const { image, name, price, category, productNumber } = item;

    return (
        <div className="group relative border border-gray-200 bg-white hover:shadow-md p-2">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                <img className="h-48 w-full object-cover rounded-t-md" src={image} alt={name} loading="lazy" />
                <div className="absolute inset-0 bg-pink-300/40 opacity-0 group-hover:opacity-100">
                    <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fa6f6f] hover:bg-[#f45e5e] px-4 py-2 text-sm font-medium text-white rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="p-3">
                <p className="text-xs text-gray-500">{category}</p>
                <p className="text-xs text-gray-400 mt-1">#{productNumber}</p>
                <h2 className="mt-1 text-sm lg:text-xl font-medium text-gray-900 truncate">{name}</h2>
                <p className="mt-1 text-sm font-bold text-[#FF9B9B]">$ {price}</p>
            </div>
        </div>
    );
};

export default Cart;