import React, { useRef, useEffect, useState } from "react";

const FadeInSection = ({ children, delay = 0 }) => {
   const domRef = useRef();
   const [isVisible, setVisible] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => setVisible(entry.isIntersecting));
      });
      const current = domRef.current;
      if (current) observer.observe(current);

      return () => {
         if (current) observer.unobserve(current);
      };
   }, []);

   return (
      <div
         ref={domRef}
         style={{ transitionDelay: `${delay}s` }}
         className={`transition-all duration-1000 ease-out transform ${isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
            }`}
      >
         {children}
      </div>
   );
};

export default FadeInSection;
