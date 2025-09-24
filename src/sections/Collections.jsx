import React, { useState } from "react";
import { useI18n } from "../i18n";

const markers = [
   { id: 1, position: { top: "65%", left: "75%" } },
   { id: 2, position: { top: "40%", left: "30%" } },
   { id: 3, position: { top: "80%", left: "50%" } },
];

const Collections = () => {
   const { t } = useI18n();
   const [activeMarker, setActiveMarker] = useState(null);

   return (
      <section id="collections" className="relative w-screen mx-[calc(50%-50vw)] px-0 py-8 sm:py-12">
         <div className="relative w-full">
            {/* Ảnh nền */}
            <img
               src="/imgs/Collections/CollectionsBackground.webp"
               alt="Collection"
               className="w-full h-auto object-cover rounded-none"
            />

            {/* Overlay Title + Button */}
            <div className="absolute top-8 left-4 sm:top-20 sm:left-12 text-left">
               <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                  {t("sections.Collections.title")}
               </h2>
               <button className="mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#5a442a] text-white font-semibold text-base sm:text-lg rounded hover:bg-[#3e2f1e] transition">
                  {t("sections.Collections.cta")}
               </button>
            </div>

            {/* Render markers */}
            {markers.map((marker) => {
               const isActive = activeMarker === marker.id;

               return (
                  <div
                     key={marker.id}
                     className="absolute cursor-pointer"
                     style={{
                        top: marker.position.top,
                        left: marker.position.left,
                        transform: "translate(-50%, -50%)",
                     }}
                     onClick={() =>
                        setActiveMarker(isActive ? null : marker.id)
                     }
                  >
                     {/* Button với hiệu ứng pulse */}
                     <div className="relative flex items-center justify-center">
                        {/* Vòng ngoài có animation */}
                        <span
                           className={`absolute w-16 h-16 rounded-full bg-white/50 animate-ping transition-opacity duration-300 ${isActive ? "opacity-50" : "opacity-100"
                              }`}
                        ></span>

                        {/* Vòng chính */}
                        <div
                           className={`relative w-12 h-12 flex items-center justify-center bg-white border border-gray-400 rounded-full shadow-md transition-all duration-300 ${isActive ? "opacity-70" : "opacity-100"
                              }`}
                        >
                           <span
                              className={`text-2xl font-bold transform transition-transform duration-300 ${isActive ? "rotate-45" : "rotate-0"
                                 }`}
                           >
                              +
                           </span>
                        </div>
                     </div>

                     {/* Modal detail */}
                     {isActive && (
                        <div
                           className="absolute top-16 left-1/2 -translate-x-1/2 w-72 bg-white/90 backdrop-blur-md shadow-lg p-4 rounded-lg z-10 animate-fadeIn transition-opacity duration-300 opacity-80"
                        >
                           <h3 className="font-semibold text-gray-900">
                              {t(`sections.Collections.markers.${marker.id - 1}.name`)}
                           </h3>
                           <p className="text-sm text-gray-600 mt-2">
                              {t(`sections.Collections.markers.${marker.id - 1}.description`)}
                           </p>
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default Collections;
