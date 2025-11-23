import React from "react";
import { useI18n } from "../i18n";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Component Section So Le (Zig-Zag)
const ZigZagSection = ({ title, text, image, index }) => {
   const reverse = index % 2 !== 0;

   return (
      <section className="py-5 sm:py-14 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">

            {/* IMAGE */}
            <motion.div
               initial={{ opacity: 0, x: reverse ? 60 : -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 0.6 }}
               className={`w-full ${reverse ? "md:order-2" : "md:order-1"}`}
            >
               <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <img
                     src={image}
                     alt={title}
                     className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover"
                  />
               </div>
            </motion.div>

            {/* TEXT */}
            <motion.div
               initial={{ opacity: 0, x: reverse ? -60 : 60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 0.6 }}
               className={`px-2 sm:px-4 ${reverse ? "md:order-1" : "md:order-2"}`}
            >
               <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#90311e] mb-3 sm:mb-4">
                  {title}
               </h3>

               <p className="text-base sm:text-lg text-gray-700 leading-relaxed sm:leading-loose">
                  {text}
               </p>
            </motion.div>
         </div>
      </section>
   );
};

const About = () => {
   const { t } = useI18n();

   const mission = t("pages.About.mission");
   const vision = t("pages.About.vision");
   const aboutUs = t("pages.About.aboutUs");
   const coreTeam = t("pages.About.coreTeam");
   const teamMembers = t("pages.About.teamMembers");

   return (
      <div className="font-sans text-gray-900 overflow-x-hidden min-h-screen flex flex-col">
         <Header />

         <main className="flex-1">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-12 md:py-14">

               {/* TITLE */}
               <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-10 sm:mb-14"
               >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#90311e] to-[#610C40] bg-clip-text text-transparent sm:mb-4">
                     {t("pages.About.title")}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                     {t("pages.About.subtitle")}
                  </p>
               </motion.div>

               {/* SO LE SECTIONS */}
               <ZigZagSection index={0} title={mission.title} text={mission.content} image={mission.image || "/images/mission.jpg"} />
               <ZigZagSection index={1} title={vision.title} text={vision.content} image={vision.image || "/images/vision.jpg"} />
               <ZigZagSection index={2} title={aboutUs.title} text={aboutUs.content} image={aboutUs.teamImage || "/imgs/About/aboutteam.jpg"} />

               {/* CORE TEAM TITLE */}
               <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#90311e] text-center mt-20 sm:mt-24 mb-8 sm:mb-10"
               >
                  {coreTeam.title}
               </motion.h2>

               {/* CORE TEAM — CAROUSEL 6 ẢNH */}
               <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={20}
                  slidesPerView={3}
                  loop={false}
                  autoplay={false}
                  navigation={true}
                  breakpoints={{
                     320: { slidesPerView: 1 },
                     640: { slidesPerView: 2 },
                     768: { slidesPerView: 3 },
                     1024: { slidesPerView: 4 },
                     1280: { slidesPerView: 5 },
                     1536: { slidesPerView: 6 },
                  }}
                  className="!pb-14"
               >
                  {teamMembers.map((member) => (
                     <SwiperSlide key={member.id}>
                        <motion.div
                           initial={{ opacity: 0, y: 40 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.6 }}
                           className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                        >
                           <div className="relative w-full aspect-[3/4] overflow-hidden">
                              {member.avatar ? (
                                 <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                 />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#90311e] to-[#610C40] text-white text-4xl font-bold">
                                    {member.name.split(" ").pop().charAt(0).toUpperCase()}
                                 </div>
                              )}
                           </div>

                           <div className="p-4 text-center">
                              <h3 className="text-lg font-bold text-[#90311e] mb-1">
                                 {member.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">
                                 {member.role}
                              </p>
                              {member.description && (
                                 <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                                    {member.description}
                                 </p>
                              )}
                           </div>
                        </motion.div>
                     </SwiperSlide>
                  ))}
               </Swiper>

            </div>
         </main>

         <Footer />
         <ChatWidget />
      </div>
   );
};

export default About;
