import React from "react";
import { useI18n } from "../i18n";

const Footer = () => {
   const { t } = useI18n();
   return (
      <footer className="bg-[#f0e6cc] text-gray-800">
         {/* Top: Newsletter + Links */}
         <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-10 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Newsletter */}
            <div className="col-span-2 xs:col-span-2 sm:col-span-1">
               <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2">{t("components.Footer.newsletter.title")}</h3>
               <p className="text-[11px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4">{t("components.Footer.newsletter.description")}</p>
               <button className="inline-flex items-center justify-center bg-[#5a442a] text-white text-[11px] sm:text-xs md:text-sm font-semibold px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-sm hover:bg-[#3e2f1e] transition">
                  {t("components.Footer.newsletter.button")}
               </button>
            </div>

            {/* About */}
            <div>
               <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3">{t("components.Footer.about.title")}</h3>
               <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-[11px] sm:text-xs md:text-sm">
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.intro")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.howToPlay")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.commitment")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.blog")}</a></li>
               </ul>
            </div>

            {/* Follow */}
            <div>
               <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3">{t("components.Footer.follow.title")}</h3>
               <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-[11px] sm:text-xs md:text-sm">
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.facebook")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.instagram")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.pinterest")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.youtube")}</a></li>
               </ul>
            </div>

            {/* Policies */}
            <div className="col-span-2 xs:col-span-2 sm:col-span-1 md:col-span-1">
               <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3">{t("components.Footer.policies.title")}</h3>
               <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-[11px] sm:text-xs md:text-sm">
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.return")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.shipping")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.security")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.promotion")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.contact")}</a></li>
               </ul>
            </div>
         </div>

         {/* Middle: Company Info compact */}
         <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6 text-[10px] sm:text-xs text-gray-700">
            <p className="font-semibold mb-0.5 sm:mb-1">{t("components.Footer.company.name")}</p>
            <p className="leading-tight">{t("components.Footer.company.address")}</p>
            <div className="mt-2 sm:mt-3">
               <img src="/imgs/Footer/boCongThuong.png" alt={t("components.Footer.company.certificate")} className="h-6 sm:h-7 md:h-8 lg:h-10" />
            </div>
         </div>

         {/* Bottom bar */}
         <div className="border-t border-[#e3d9be]">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-[10px] sm:text-xs text-gray-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2">
               <span>{t("components.Footer.bottom.copyright")}</span>
               <div className="flex gap-3 sm:gap-4">
                  <a href="#" className="hover:underline">{t("components.Footer.bottom.terms")}</a>
                  <a href="#" className="hover:underline">{t("components.Footer.bottom.privacy")}</a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
