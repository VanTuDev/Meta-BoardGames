import React from "react";
import { useI18n } from "../i18n";

const Footer = () => {
   const { t } = useI18n();
   return (
      <footer className="bg-[#f0e6cc] text-gray-800">
         {/* Top: Newsletter + Links */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Newsletter */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-2">{t("components.Footer.newsletter.title")}</h3>
               <p className="text-sm mb-4">{t("components.Footer.newsletter.description")}</p>
               <button className="inline-flex items-center justify-center bg-[#5a442a] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#3e2f1e] transition">
                  {t("components.Footer.newsletter.button")}
               </button>
            </div>

            {/* About */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-3">{t("components.Footer.about.title")}</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.intro")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.howToPlay")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.commitment")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.about.links.blog")}</a></li>
               </ul>
            </div>

            {/* Follow */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-3">{t("components.Footer.follow.title")}</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.facebook")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.instagram")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.pinterest")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.follow.links.youtube")}</a></li>
               </ul>
            </div>

            {/* Policies */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-3">{t("components.Footer.policies.title")}</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.return")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.shipping")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.security")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.promotion")}</a></li>
                  <li><a href="#" className="hover:underline">{t("components.Footer.policies.links.contact")}</a></li>
               </ul>
            </div>
         </div>

         {/* Middle: Company Info compact */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6 text-xs text-gray-700">
            <p className="font-semibold">{t("components.Footer.company.name")}</p>
            <p>{t("components.Footer.company.address")}</p>
            <div className="mt-3">
               <img src="/imgs/Footer/boCongThuong.png" alt={t("components.Footer.company.certificate")} className="h-8 md:h-10" />
            </div>
         </div>

         {/* Bottom bar */}
         <div className="border-t border-[#e3d9be]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-gray-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
               <span>{t("components.Footer.bottom.copyright")}</span>
               <div className="flex gap-4">
                  <a href="#" className="hover:underline">{t("components.Footer.bottom.terms")}</a>
                  <a href="#" className="hover:underline">{t("components.Footer.bottom.privacy")}</a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
