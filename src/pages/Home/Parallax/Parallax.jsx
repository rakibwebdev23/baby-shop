import React from 'react';
import { Link } from "react-router-dom";
import Container from "../../../components/Container/Container";
import img from "../../../assets/cloth3.jpg"

const Parallax = () => {
    const stats = [
        { number: "1000+", label: "Baby Products" },
        { number: "15k+", label: "Happy Parents" },
        { number: "100+", label: "Top Brands" },
        { number: "25+", label: "Years Trust" }
    ];

    return (
        <div className="relative mt-20 py-16 lg:py-32 bg-cover bg-fixed bg-center" style={{ backgroundImage: `url("${img}")` }}>
            <div className="absolute inset-0 bg-black bg-opacity-25" />

            <Container>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                            The Perfect Start for Your Little One
                        </h1>

                        <div className="w-20 lg:w-36 h-1 bg-[#FF9B9B] rounded-full transform transition-all duration-300 hover:w-48" />

                        <p className="text-lg text-white leading-relaxed">
                            Find everything your baby needs in one place. We carefully select
                            each product to ensure comfort, safety, and joy for your precious
                            little ones.
                        </p>

                        <Link className='pt-2' to="/shop">
                            <button className='py-4 px-8 bg-[#FF9B9B] mt-2 text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#FF8080]'>
                                Explore More
                            </button>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="grid grid-cols-2 gap-4 lg:gap-6">
                        {stats.map((stat, index) => (
                            <div key={index}
                                className="bg-[#FF9B9B] rounded-lg p-6 transform transition-all duration-300 
                                hover:scale-105 hover:shadow-xl hover:bg-[#FF8080]">
                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                                        {stat.number}
                                    </h1>
                                    <h3 className="text-sm lg:text-base font-medium text-white uppercase tracking-wider">
                                        {stat.label}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/90 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-bold text-[#f96767] mb-2">Fast & Free Delivery</h3>
                        <p className="text-gray-800">Free shipping on orders over $50</p>
                    </div>
                    <div className="bg-white/90 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-bold text-[#f96767] mb-2">Quality Guarantee</h3>
                        <p className="text-gray-800">Every product safety certified</p>
                    </div>
                    <div className="bg-white/90 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-bold text-[#f96767] mb-2">Parent Support</h3>
                        <p className="text-gray-800">Expert assistance available 24/7</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Parallax;