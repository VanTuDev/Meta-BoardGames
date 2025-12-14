import React, { useEffect, useState } from "react";
import { useI18n } from "../i18n";

const StaticMeta = () => {
   const { t } = useI18n();
   const [soldProducts, setSoldProducts] = useState(0);
   const [revenue, setRevenue] = useState(0);
   const [customers, setCustomers] = useState(0);

   const targetSoldProducts = 43;
   const targetRevenue = 9654000;
   const targetCustomers = 39;
   const duration = 8000; // 8 giây
   const steps = 60; // Số bước animation

   useEffect(() => {
      let startTime = null;
      let animationFrame = null;

      const animate = (timestamp) => {
         if (!startTime) startTime = timestamp;
         const elapsed = timestamp - startTime;
         const progress = Math.min(elapsed / duration, 1);

         // Easing function để animation mượt hơn
         const easeOutQuart = 1 - Math.pow(1 - progress, 4);

         setSoldProducts(Math.floor(easeOutQuart * targetSoldProducts));
         setRevenue(Math.floor(easeOutQuart * targetRevenue));
         setCustomers(Math.floor(easeOutQuart * targetCustomers));

         if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
         } else {
            // Đảm bảo đạt đúng giá trị cuối cùng
            setSoldProducts(targetSoldProducts);
            setRevenue(targetRevenue);
            setCustomers(targetCustomers);
         }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
         if (animationFrame) {
            cancelAnimationFrame(animationFrame);
         }
      };
   }, []);

   // Format số với dấu chấm ngăn cách hàng nghìn
   const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   };

   return (
      <section className="bg-[#ece7d1] py-16 mt-12">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               {/* Số sản phẩm bán được */}
               <div className="flex flex-col items-center">
                  <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#8B0000] mb-4">
                     {formatNumber(soldProducts)}
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-[#8B0000]">
                     {t("sections.StaticMeta.soldProducts.label")}
                  </div>
               </div>

               {/* Số doanh thu */}
               <div className="flex flex-col items-center">
                  <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#8B0000] mb-4">
                     {formatNumber(revenue)}
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-[#8B0000]">
                     {t("sections.StaticMeta.revenue.label")}
                  </div>
               </div>

               {/* Số khách hàng */}
               <div className="flex flex-col items-center">
                  <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#8B0000] mb-4">
                     {formatNumber(customers)}
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-[#8B0000]">
                     {t("sections.StaticMeta.customers.label")}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default StaticMeta;

