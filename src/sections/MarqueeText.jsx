import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeText = () => {
   return (
      <section className="bg-opacity-5 py-12">
         <Marquee speed={50} gradient={false} className="text-3xl font-bold text-[#66431b]">
            <span className="mx-10">Where History Meets Adventure</span>
            <span className="mx-10">Where History Meets Adventure</span>
            <span className="mx-10">Where History Meets Adventure</span>
            <span className="mx-10">Where History Meets Adventure</span>
         </Marquee>
      </section>
   );
};

export default MarqueeText;
