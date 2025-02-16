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
  ];

  return (
    <div className="relative w-full mx-auto h-[500px] lg:h-[600px] py-10 lg:px-8">
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
        className="overflow-hidden shadow-2xl h-full rounded-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex justify-center items-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                <div className="text-white text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-orange-300">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">
                    {slide.description}
                  </p>
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
