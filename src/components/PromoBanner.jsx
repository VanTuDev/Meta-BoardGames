import React from "react";
import Marquee from "react-fast-marquee";

const PromoBanner = () => {
   return (
      <div className="bg-[#1a1a1a] text-white py-2.5 text-[10px] sm:text-sm md:text-base">
         <Marquee gradient={false} speed={50}>
            <div className="flex items-center text-[11px] gap-x-12 sm:gap-x-16 md:gap-x-20">
               <span className="font-medium">10% OFF for your first order</span>
               <span className="opacity-50">•</span>
               <span className="font-medium">
                  10% OFF for your first order</span>
               <span className="opacity-50">•</span>
               <span className="font-medium">
                  10% OFF for your first order</span>
               <span className="opacity-50">•</span>
               <span className="font-medium text-gold">
                  10% OFF for your first order</span>
            </div>
         </Marquee>
      </div>
   );
};

export default PromoBanner;
