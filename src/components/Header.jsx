import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { useI18n } from "../i18n";

const Header = () => {
   const { t, locale, setLocale } = useI18n();
   const [open, setOpen] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   // Khóa cuộn nền khi mở menu
   useEffect(() => {
      if (open) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }
   }, [open]);

   const closeMenu = () => setOpen(false);

   // Hàm xử lý scroll đến section
   const handleScrollToSection = (sectionId) => {
      closeMenu();
      if (location.pathname !== "/") {
         // Nếu không ở trang chính, chuyển về trang chính
         navigate("/");
         // Đợi một chút để trang load xong rồi scroll
         setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
               element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
         }, 100);
      } else {
         // Nếu đang ở trang chính, scroll trực tiếp
         const element = document.getElementById(sectionId);
         if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
         }
      }
   };

   return (
      <header className="sticky top-0 z-[100] w-full border-b border-gray-200 bg-white/95 backdrop-blur">
         <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-3 md:px-6">

            {/* Left Menu */}
            <nav className="hidden md:flex items-center space-x-6 font-sans text-sm">
               <button
                  onClick={() => handleScrollToSection("products")}
                  className="flex items-center hover:text-gray-500 font-bold cursor-pointer text-gray-900"
               >
                  {t("components.Header.nav.products")} <ChevronDown className="w-4 h-4 ml-1" />
               </button>
               <Link to="/about" className="hover:text-gray-500 font-bold text-gray-900">{t("components.Header.nav.about")}</Link>
            </nav>

            {/* Logo center */}
            <div className="font-serif text-xl font-bold tracking-widest">
               <img
                  src="/imgs/Logo/logo.png"
                  alt="Logo"
                  className="w-12 h-10 md:w-16 md:h-14 object-contain"
               />
            </div>


            {/* Right Menu */}
            <div className="flex items-center space-x-4 md:space-x-6 text-sm font-sans">
               {/* Hamburger mobile */}
               <button
                  className="md:hidden p-2 rounded hover:bg-gray-100"
                  aria-label="Open menu"
                  onClick={() => setOpen(true)}
               >
                  <Menu className="w-6 h-6" />
               </button>
               <a
                  href="https://www.facebook.com/profile.php?id=61581090817119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block hover:text-gray-500 font-bold text-gray-900"
               >
                  {t("components.Header.nav.contact")}
               </a>
               {/* Locale Switcher */}
               <div className="flex items-center gap-2">
                  <button
                     className={`flex items-center gap-1 px-2 py-1 rounded-sm border ${locale === "vi" ? "border-[#5a442a]" : "border-transparent"}`}
                     onClick={() => setLocale("vi")}
                     aria-label="Chuyển tiếng Việt"
                  >
                     <img src="https://flagcdn.com/w20/vn.png" alt="VI" className="w-4 h-3" />
                     <span className="hidden md:inline">VI</span>
                  </button>
                  <button
                     className={`flex items-center gap-1 px-2 py-1 rounded-sm border ${locale === "en" ? "border-[#5a442a]" : "border-transparent"}`}
                     onClick={() => setLocale("en")}
                     aria-label="Switch to English"
                  >
                     <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-4 h-3" />
                     <span className="hidden md:inline">EN</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Overlay */}
         {open && (
            <div
               className="fixed inset-0 bg-black/40 z-[90] md:hidden"
               onClick={closeMenu}
            />
         )}

         {/* Drawer trái */}
         <aside
            className={`fixed top-0 left-0 h-full w-72 bg-white z-[100] transform transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"
               }`}
            aria-hidden={!open}
         >
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <span className="font-semibold">Menu</span>
               <button className="p-2 rounded hover:bg-gray-100" aria-label="Close menu" onClick={closeMenu}>
                  <X className="w-6 h-6" />
               </button>
            </div>
            <nav className="flex flex-col p-4 space-y-3 text-base bg-white">
               <button
                  onClick={() => handleScrollToSection("products")}
                  className="py-2 hover:text-gray-600 text-left"
               >
                  {t("components.Header.nav.products")}
               </button>
               <Link to="/about" className="py-2 hover:text-gray-600" onClick={closeMenu}>{t("components.Header.nav.about")}</Link>
               <a
                  href="https://www.facebook.com/profile.php?id=61581090817119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 hover:text-gray-600"
                  onClick={closeMenu}
               >
                  {t("components.Header.nav.contact")}
               </a>
               <div className="flex gap-3 pt-2">
                  <button className={`flex items-center gap-1 px-2 py-1 rounded-sm border ${locale === "vi" ? "border-[#5a442a]" : "border-gray-200"}`} onClick={() => setLocale("vi")}>
                     <img src="https://flagcdn.com/w20/vn.png" alt="VI" className="w-4 h-3" /> VI
                  </button>
                  <button className={`flex items-center gap-1 px-2 py-1 rounded-sm border ${locale === "en" ? "border-[#5a442a]" : "border-gray-200"}`} onClick={() => setLocale("en")}>
                     <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-4 h-3" /> EN
                  </button>
               </div>
            </nav>
         </aside>
      </header>
   );
};

export default Header;
