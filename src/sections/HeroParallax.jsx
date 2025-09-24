import React from "react";
import FadeInSection from "./FadeInSection";
import HeroParallaxIMG from "../../public/imgs/HeroParallax/FadeInSection.jpg";

const HeroParallax = () => {
   return (
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
         {/* Background image */}
         <div
            className="absolute inset-0 bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url(${HeroParallaxIMG})` }}
         ></div>

         {/* Overlay dark */}
         <div className="absolute inset-0 bg-black/40"></div>

         {/* Content */}
         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <FadeInSection>
               <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-snug">
                  Tôn vinh bàn tay & khối óc Việt Nam
               </h1>
            </FadeInSection>

            <FadeInSection delay={0.3}>
               <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xl sm:max-w-2xl mx-auto">
                  Nơi boardgame gặp gỡ sự tinh hoa thủ công.
               </p>
            </FadeInSection>

            <FadeInSection delay={0.6}>
               <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-[#5a442a] text-white rounded-lg hover:bg-[#3e2f1e] transition shadow-lg text-sm sm:text-base">
                  Khám phá ngay
               </button>
            </FadeInSection>
         </div>
      </section>
   );
};

export default HeroParallax;
