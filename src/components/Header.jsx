import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Globe, ChevronDown, Menu, X } from "lucide-react";

const Header = () => {
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
                  Products <ChevronDown className="w-4 h-4 ml-1" />
               </a>
               <a href="#collections" className="flex items-center hover:text-gray-500 font-bold">
                  Collections <ChevronDown className="w-4 h-4 ml-1" />
               </a>
               <a href="#about" className="hover:text-gray-500 font-bold">Giới thiệu</a>
            </nav>

            {/* Logo center */}
            <div className="font-serif text-xl font-bold tracking-widest">
               <img src="/imgs/Logo/logo.png" alt="Logo" className="w-20 h-16 md:w-24 md:h-20 object-contain" />
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
               <a href="#" className="hidden md:block hover:text-gray-500 font-bold">Liên hệ</a>
               <div className="flex items-center space-x-1 cursor-pointer">
                  <Globe className="w-4 h-4 hover:text-gray-500" />
                  <span className="hidden md:inline hover:text-gray-500 font-bold">USD</span>
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
               <a href="#products" className="py-2 hover:text-gray-600" onClick={closeMenu}>Products</a>
               <a href="#collections" className="py-2 hover:text-gray-600" onClick={closeMenu}>Collections</a>
               <a href="#about" className="py-2 hover:text-gray-600" onClick={closeMenu}>Giới thiệu</a>
            </nav>
         </aside>
      </header>
   );
};

export default Header;
