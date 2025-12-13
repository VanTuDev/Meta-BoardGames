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
               2560: {
                  // Ultrawide (2560x1080)
                  autoplay: {
                     delay: 6000,
                  },
                  speed: 800,
               },
            }}
            className="rounded-none overflow-hidden w-full"
         >
            {/* Slide 1 */}
            <SwiperSlide>
               <div className="relative w-full aspect-[2560/1080] bg-gray-100 overflow-hidden">
                  <img
                     src="/imgs/Carousel/bannermeta.png"
                     alt="Banner M.ETA"
                     className="w-full h-full object-cover"
                     loading="eager"
                     fetchpriority="high"
                  />
               </div>
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default Carousel;
