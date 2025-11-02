import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Globe, ChevronDown, Menu, X } from "lucide-react";
import { useI18n } from "../i18n";

const Header = () => {
   const { t, locale, setLocale } = useI18n();
   const [open, setOpen] = useState(false);

   // Khóa cuộn nền khi mở menu
   useEffect(() => {
      if (open) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }
   }, [open]);

   const closeMenu = () => setOpen(false);

   return (
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
         <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-3 md:px-6">

            {/* Left Menu */}
            <nav className="hidden md:flex items-center space-x-6 font-sans text-sm">
               <a href="#products" className="flex items-center hover:text-gray-500 font-bold">
                  {t("components.Header.nav.products")} <ChevronDown className="w-4 h-4 ml-1" />
               </a>
               <a href="#collections" className="flex items-center hover:text-gray-500 font-bold">
                  {t("components.Header.nav.collections")} <ChevronDown className="w-4 h-4 ml-1" />
               </a>
               <a href="#about" className="hover:text-gray-500 font-bold">{t("components.Header.nav.about")}</a>
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
               <a href="#" className="hidden md:block hover:text-gray-500 font-bold">{t("components.Header.nav.contact")}</a>
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
               <Search className="w-5 h-5 cursor-pointer hover:text-gray-500" />
               <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-500" />
            </div>
         </div>

         {/* Overlay */}
         {open && (
            <div
               className="fixed inset-0 bg-black/40 z-40 md:hidden"
               onClick={closeMenu}
            />
         )}

         {/* Drawer trái */}
         <aside
            className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"
               }`}
            aria-hidden={!open}
         >
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <span className="font-semibold">Menu</span>
               <button className="p-2 rounded hover:bg-gray-100" aria-label="Close menu" onClick={closeMenu}>
                  <X className="w-6 h-6" />
               </button>
            </div>
            <nav className="flex flex-col p-4 space-y-3 text-base">
               <a href="#products" className="py-2 hover:text-gray-600" onClick={closeMenu}>{t("components.Header.nav.products")}</a>
               <a href="#collections" className="py-2 hover:text-gray-600" onClick={closeMenu}>{t("components.Header.nav.collections")}</a>
               <a href="#about" className="py-2 hover:text-gray-600" onClick={closeMenu}>{t("components.Header.nav.about")}</a>
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
