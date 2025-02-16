import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: "/src/assets/img1.jpg",
            title: "Welcome to Baby Shop",
            description: "Find every thing for your baby",
        },
        {
            id: 2,
            image: "/src/assets/img2.jpg",
            title: "Welcome to Baby Shop",
            description: "Find every thing for your baby",
        },
        {
            id: 3,
            image: "/src/assets/img3.jpg",
            title: "Welcome to Baby Shop",
            description: "Find every thing for your baby",
        },
    ];

    return (
        <div className="relative w-full mx-auto h-[500px] lg:h-[600px]">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                className="overflow-hidden h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
                                    <div className="text-center animate-fade-in">
                                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-orange-300 animate-slide-up">
                                            {slide.title}
                                        </h2>
                                        <p className="text-sm sm:text-base lg:text-lg text-white opacity-90 animate-slide-up-delayed">
                                            {slide.description}
                                        </p>
                                        <button className="mt-6 px-8 py-3 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 animate-fade-in-delayed">
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;