import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import các module cần
import { Autoplay, EffectFade } from "swiper/modules";

// import css Swiper
import "swiper/css";
import "swiper/css/effect-fade";

const Carousel = () => {
   return (
      <div className="w-full mx-auto">
         <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true} // lặp vô hạn
            effect="fade" // hiệu ứng mờ
            autoplay={{
               delay: 5000, // đổi slide mỗi 5s
               disableOnInteraction: false,
            }}
            speed={800} // hiệu ứng fade 0.8s
            className="rounded-none overflow-hidden"
         >
            {/* Slide 1 */}
            <SwiperSlide>
               <img
                  src="/imgs/Carousel/CarouselBaner.webp"
                  alt="Banner 1"
                  className="w-full h-[320px] sm:h-[420px] md:h-[600px] lg:h-[700px] object-cover"
               />
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
               <img
                  src="/imgs/Carousel/CarouselBaner2.webp"
                  alt="Banner 2"
                  className="w-full h-[320px] sm:h-[420px] md:h-[600px] lg:h-[700px] object-cover"
               />
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default Carousel;
