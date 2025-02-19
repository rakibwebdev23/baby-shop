import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../Container/Container";
import useProducts from "../../hooks/useProducts";

const ProductDetails = () => {
    const item = useLoaderData();
    const { image, name, price, category, productNumber, description, tags } = item;
    const [, , offeredProducts] = useProducts();
    const [quantity, setQuantity] = useState(1);


    // Simple increment/decrement functions
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Add to cart function
    const addToCart = () => {
        alert(`Added ${quantity} item(s) to cart`);
        // Here you would typically add the item to your cart state or send to API
    };

    return (
        <Container>
            {/* Main product section */}
            <div className="mt-10 mb-16">
                {/* Product layout - stack on mobile, side by side on larger screens */}
                <div className="lg:flex gap-8">
                    {/* Product Image */}
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <img
                            className="w-full rounded-lg"
                            src={image}
                            alt={name}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-2xl lg:text-4xl font-bold">{name}</h2>

                        {/* Price with discount tag */}
                        <div>
                            <p className="text-xl lg:text-2xl font-semibold flex items-center text-pink-500">
                                $ {price}
                                <span className="text-xs py-1 px-4 bg-pink-300 text-white rounded-md ml-4">
                                    10% OFF
                                </span>
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700">{description}</p>

                        {/* Order Section with Quantity Selector and Add to Cart button side by side */}
                        <div className="flex items-center space-x-4 mt-6">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    onClick={decrementQuantity}
                                    className="w-10 h-10 flex items-center justify-center text-lg font-bold"
                                >
                                    -
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center border-l border-r border-gray-300">
                                    {quantity}
                                </span>
                                <button
                                    onClick={incrementQuantity}
                                    className="w-10 h-10 flex items-center justify-center text-lg font-bold"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={addToCart}
                                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded transition-colors duration-200 flex-grow md:flex-grow-0"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="mb-2">SKU: {productNumber}</p>
                            <p className="mb-2">Category: {category}</p>
                            <p className="mb-2">Tags: {tags}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section - Simple Grid */}
            <div className="my-12">
                <h3 className="text-xl font-bold mb-6 text-center">You May Also Like</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offeredProducts.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded"
                            />
                            <h4 className="font-medium text-lg">{product.name}</h4>
                            <p className="text-pink-500 font-bold">${product.price}</p>

                            {/* Quantity and Add to Cart for related products */}
                            <div className="flex items-center mt-3 gap-2">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button className="w-8 h-8 flex items-center justify-center text-sm">-</button>
                                    <span className="w-8 h-8 flex items-center justify-center border-l border-r border-gray-300">1</span>
                                    <button className="w-8 h-8 flex items-center justify-center text-sm">+</button>
                                </div>
                                <button className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded text-sm flex-grow">
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductDetails;