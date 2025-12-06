import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import các module cần
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// import css Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Carousel = () => {
   return (
      <div className="w-full mx-auto relative">
         <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true} // lặp vô hạn
            effect="fade" // hiệu ứng mờ
            autoplay={{
               delay: 4000, // mobile nhanh hơn: 4s, desktop: 5s (điều chỉnh qua breakpoints)
               disableOnInteraction: false,
               pauseOnMouseEnter: true, // tạm dừng khi hover (desktop)
            }}
            speed={600} // hiệu ứng fade nhanh hơn cho mobile
            pagination={{
               clickable: true,
               dynamicBullets: true, // bullets tự động resize
            }}
            breakpoints={{
               320: {
                  // Mobile nhỏ (iPhone SE)
                  autoplay: {
                     delay: 3500,
                  },
                  speed: 500,
               },
               640: {
                  // Mobile lớn / Tablet nhỏ
                  autoplay: {
                     delay: 4000,
                  },
                  speed: 600,
               },
               768: {
                  // Tablet
                  autoplay: {
                     delay: 4500,
                  },
                  speed: 700,
               },
               1024: {
                  // Desktop
                  autoplay: {
                     delay: 5000,
                  },
                  speed: 800,
               },
               1280: {
                  // Desktop lớn
                  autoplay: {
                     delay: 5500,
                  },
                  speed: 800,
               },
            }}
            className="rounded-none overflow-hidden w-full"
         >
            {/* Slide 1 */}
            <SwiperSlide>
               <div className="relative w-full flex items-center justify-center bg-gray-100 h-[250px] xs:h-[280px] sm:h-[380px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
                  <img
                     src="/imgs/Carousel/banner.jpg"
                     alt="Banner 1"
                     className="w-full h-full object-contain object-center max-w-full max-h-full"
                     loading="eager" // slide đầu tiên load ngay
                     fetchpriority="high"
                  />
               </div>
            </SwiperSlide>

            {/* Slide 2 */}
            {/* <SwiperSlide>
               <div className="relative w-full flex items-center justify-center bg-gray-100 h-[250px] xs:h-[280px] sm:h-[380px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
                  <img
                     src="/imgs/Carousel/CarouselBaner2.webp"
                     alt="Banner 2"
                     className="w-full h-full object-contain object-center max-w-full max-h-full"
                     loading="lazy" // slide sau load lazy
                  />
               </div>
            </SwiperSlide> */}
         </Swiper>
      </div>
   );
};

export default Carousel;
