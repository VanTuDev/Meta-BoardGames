// ============================================================
// FULL HERO + FLASHCARD MODAL – 3 LAYOUT (TOP – LEFT – RIGHT)
// ============================================================

import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import HeroParallaxIMG from "../../public/imgs/HeroParallax/FadeInSection.jpg";
import { useI18n } from "../i18n";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

// ============================================================
// CARD 1 — IMAGE TOP
// ============================================================
const CardTop = ({ card, idx, total }) => (
   <div className="bg-white rounded-2xl shadow-xl border p-4 flex flex-col h-full relative">

      {/* Badge số thứ tự */}
      <div className="absolute top-3 right-3 bg-[#90311e] text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
         {idx + 1} / {total}
      </div>

      {/* Title */}
      <h3 className="text-center text-sm font-bold text-[#90311e] mb-3 uppercase">
         {card.title}
      </h3>

      {/* Image on top - nhỏ hơn để card bằng nhau */}
      <div className="w-full rounded-xl overflow-hidden shadow-md mb-3 max-h-[200px] flex items-center justify-center bg-gray-50">
         <img
            src={card.image}
            className="w-full h-full object-contain max-h-[200px]"
         />
      </div>

      {/* Content - căn giữa theo trục dọc */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-[140px] flex items-center">
         <p className="text-gray-700 text-xs leading-relaxed text-justify w-full">
            {card.content}
         </p>
      </div>

      {/* Footer */}
      <div className="mt-2 text-center text-[11px] text-gray-500 italic">
         Vuốt để xem tiếp →
      </div>

   </div>
);

// ============================================================
// CARD 2 — IMAGE LEFT
// ============================================================
const CardLeft = ({ card, idx, total }) => (
   <div className="bg-white rounded-2xl shadow-xl border p-4 flex flex-col md:flex-row gap-4 h-full relative">

      {/* Badge số thứ tự */}
      <div className="absolute top-3 right-3 bg-[#90311e] text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
         {idx + 1} / {total}
      </div>

      {/* Image left */}
      <div className="md:w-1/2 rounded-xl overflow-hidden shadow-md">
         <img
            src={card.image}
            className="w-full h-full object-cover"
         />
      </div>

      {/* Content - căn giữa theo trục dọc */}
      <div className="flex-1 flex flex-col justify-center">
         <h3 className="text-sm font-bold text-[#90311e] mb-2 uppercase">
            {card.title}
         </h3>

         <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar flex items-center">
            <p className="text-gray-700 text-xs leading-relaxed text-justify w-full">
               {card.content}
            </p>
         </div>

         <div className="mt-2 text-center text-[11px] text-gray-500 italic">
            Vuốt để xem tiếp →
         </div>
      </div>

   </div>
);

// ============================================================
// CARD 3 — IMAGE RIGHT
// ============================================================
const CardRight = ({ card, idx, total }) => (
   <div className="bg-white rounded-2xl shadow-xl border p-4 flex flex-col md:flex-row gap-4 h-full relative">

      {/* Badge số thứ tự */}
      <div className="absolute top-3 right-3 bg-[#90311e] text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
         {idx + 1} / {total}
      </div>

      {/* Content left - căn giữa theo trục dọc */}
      <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
         <h3 className="text-sm font-bold text-[#90311e] mb-2 uppercase">
            {card.title}
         </h3>

         <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar flex items-center">
            <p className="text-gray-700 text-xs leading-relaxed text-justify w-full">
               {card.content}
            </p>
         </div>

         <div className="mt-2 text-center text-[11px] text-gray-500 italic">
            Vuốt để xem tiếp →
         </div>
      </div>

      {/* Image right */}
      <div className="md:w-1/2 rounded-xl overflow-hidden shadow-md order-1 md:order-2">
         <img
            src={card.image}
            className="w-full h-full object-cover"
         />
      </div>

   </div>
);

// ============================================================
// MODAL FLASHCARD
// ============================================================
const HistoryModal = ({ isOpen, onClose, t }) => {
   const cards = t("sections.HeroParallax.modal.cards") || [];

   const renderCard = (card, idx) => {
      if (idx === 0) return <CardTop card={card} idx={idx} total={cards.length} />;
      if (idx === 1) return <CardLeft card={card} idx={idx} total={cards.length} />;
      return <CardRight card={card} idx={idx} total={cards.length} />;
   };

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Backdrop - click để đóng modal */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] cursor-pointer"
               />

               {/* Close button - click để đóng modal */}
               <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={onClose}
                  className="fixed top-4 right-4 z-[9999] bg-white/90 p-3 rounded-full shadow-xl hover:scale-110 transition cursor-pointer"
                  aria-label="Đóng modal"
               >
                  <X className="w-6 h-6 text-[#90311e]" />
               </motion.button>

               {/* Modal flashcard - ngăn event bubbling khi click vào card */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
               >
                  <div
                     className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl pointer-events-auto"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <Swiper
                        effect="cards"
                        grabCursor={true}
                        modules={[EffectCards, Pagination]}
                        pagination={{ clickable: true }}
                        className="max-w-full"
                     >
                        {cards.map((card, idx) => (
                           <SwiperSlide key={idx}>
                              {renderCard(card, idx)}
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
};

// ============================================================
// HERO SECTION
// ============================================================
const HeroParallax = () => {
   const { t } = useI18n();
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
      <>
         {/* HERO */}
         <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
            <div
               className="absolute inset-0 bg-fixed bg-center bg-cover"
               style={{ backgroundImage: `url(${HeroParallaxIMG})` }}
            ></div>

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
               <FadeInSection>
                  <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
                     {t("sections.HeroParallax.title")}
                  </h1>
               </FadeInSection>

               <FadeInSection delay={0.3}>
                  <p className="mt-4 text-gray-200 max-w-xl text-sm md:text-lg">
                     {t("sections.HeroParallax.subtitle")}
                  </p>
               </FadeInSection>

               <FadeInSection delay={0.6}>
                  <button
                     onClick={() => setIsModalOpen(true)}
                     className="mt-6 px-8 py-3 bg-[#90311e] text-white rounded-lg 
                              hover:bg-[#7a2818] transition shadow-lg"
                  >
                     {t("sections.HeroParallax.button")}
                  </button>
               </FadeInSection>
            </div>
         </section>

         {/* MODAL */}
         <HistoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            t={t}
         />
      </>
   );
};

export default HeroParallax;
