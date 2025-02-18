import React from "react";
import Marquee from "react-fast-marquee";
import { FaHeart, FaStar } from "react-icons/fa";

const MarqueeSlider = () => {
    const items = [
        { text: "EASY TO ASEMBLE", icon: "heart" },
        { text: "BEAUTIFUL DESIGN", icon: "star" },
        { text: "HIGH QUALITY", icon: "heart" },
        { text: "NEW PRODUCTS", icon: "star" },
        { text: "EASY TO", icon: "heart" }
    ];

    const renderIcon = (iconType) => {
        if (iconType === "heart") {
            return <FaHeart className="text-[#b4d4d7]" size={28} />;
        }
        return <FaStar className="text-[#e7c697]" size={28} />;
    };

    return (
        <div className="relative py-10">
            <Marquee
                gradient={false}
                speed={40}
                className="overflow-hidden border-2 py-10 bg-white/90"
            >
                <div className="flex items-center gap-x-16 px-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-x-3"
                        >
                            {renderIcon(item.icon)}
                            <span className="text-2xl font-medium tracking-wider text-gray-800 uppercase">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default MarqueeSlider;