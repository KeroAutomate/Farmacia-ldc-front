'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import { Autoplay, Navigation } from "swiper/modules";
import Image from 'next/image';
import "./SliderAds.css"
export const runtime = 'edge';

const ProductCarousel = () => {
return (
    <div className="carroussel-container">
    <Swiper
    className="swiper-custom"
    spaceBetween={20}
    slidesPerView={1}
    navigation
    modules={[Navigation, Autoplay]}
    loop={true}
    autoplay={{ 
        delay: 3000,
        disableOnInteraction: false,
    }}
    >
    <SwiperSlide>
        <div className="slide-content">
            <Image
            src="/bannerTest.svg"
            alt="Banner"
            width={1269}
            height={300}
            />
        </div>
    </SwiperSlide>

    <SwiperSlide>
        <div className="slide-content">
            <Image
            src="/banner2.png"
            alt="Banner"
            width={1269}
            height={300}
            />
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className="slide-content">
            <Image
            src="/banner3.png"
            alt="Banner"
            width={1269}
            height={300}
            />
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className="slide-content">
            <Image
            src="/bannerTest.svg"
            alt="Banner"
            width={1269}
            height={300}
            />
        </div>
    </SwiperSlide>
    </Swiper>
    </div>
);
};

export default ProductCarousel;
