import React, { useState } from "react";

const markers = [
   {
      id: 1,
      name: "Premium Tournament Chess Set",
      description:
         "Bộ cờ Vua thiết kế theo chuẩn FIDE, làm từ gỗ óc chó bền bỉ, đẳng cấp.",
      position: { top: "65%", left: "75%" },
   },
   {
      id: 2,
      name: "Mahjong Majestic",
      description:
         "Bộ Mahjong thủ công cao cấp, lấy cảm hứng từ kiến trúc Á Đông.",
      position: { top: "40%", left: "30%" },
   },
   {
      id: 3,
      name: "Poker Chip Set",
      description:
         "Hộp poker gỗ sang trọng, bao gồm chip và phụ kiện thi đấu.",
      position: { top: "80%", left: "50%" },
   },
];

const Collections = () => {
   const [activeMarker, setActiveMarker] = useState(null);

   return (
      <section className="relative w-screen mx-[calc(50%-50vw)] px-0 py-12">
         <div className="relative w-full">
            {/* Ảnh nền */}
            <img
               src="/imgs/Collections/CollectionsBackground.webp"
               alt="Collection"
               className="w-full h-auto object-cover rounded-none"
            />

            {/* Overlay Title + Button */}
            <div className="absolute top-28 left-12 text-left">
               <h2 className="text-7xl font-bold text-white drop-shadow-lg">
                  BST Signature
               </h2>
               <button className="mt-6 px-8 py-3 bg-[#5a442a] text-white font-semibold text-lg rounded hover:bg-[#3e2f1e] transition">
                  Khám phá
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
                              {marker.name}
                           </h3>
                           <p className="text-sm text-gray-600 mt-2">
                              {marker.description}
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
