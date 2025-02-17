import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useProducts from "../../../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const NewProduct = () => {
    const [, , , newProducts] = useProducts();
    return (
        <Container>
            <div className="pt-14">
                <SectionTitle title="New" subTitle="collection"></SectionTitle>
            </div>
            <div className="py-10 bg-gray-100 shadow px-4 lg:px-12 rounded-lg">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                >
                    {newProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="relative group rounded-lg overflow-hidden shadow-lg transition duration-500">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-500">
                                    <p className="text-xs text-gray-50 py-1 px-2 bg-[#FF9B9B] rounded w-1/4 text-center">{product.category}</p>
                                    <p className="text-xs text-gray-200 mt-1">#{product.productNumber}</p>
                                    <h2 className="mt-1 text-sm lg:text-xl font-medium text-white truncate">{product.name}</h2>
                                    <p className="mt-1 text-sm font-bold text-[#FF9B9B]">
                                        ${product.price}
                                    </p>
                                    <Link>
                                        <button className="mt-3 px-4 py-2 w-full bg-[#FF9B9B] text-white text-sm font-semibold rounded hover:bg-[#FF8080] transition">
                                            View More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
};

export default NewProduct;