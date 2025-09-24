import React from "react";
import { Search, ShoppingCart, Globe, ChevronDown } from "lucide-react";

const Header = () => {
   return (
      <header className="w-full border-b border-gray-200 bg-white">
         <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-1">

            {/* Left Menu */}
            <nav className="flex items-center space-x-6 font-sans text-sm">
               <a href="#" className="flex items-center hover:text-gray-500 font-bold">
                  Products <ChevronDown className="w-4 h-4 ml-1" />
               </a>
               <a href="#" className="flex items-center hover:text-gray-500 font-bold">
                  Collections <ChevronDown className="w-4 h-4 ml-1" />
               </a>
               <a href="#" className="hover:text-gray-500 font-bold">Giới thiệu</a>
            </nav>

            {/* Logo center */}
            <div className="font-serif text-xl font-bold tracking-widest">
               <img src="/imgs/Logo/logo.png" alt="Logo" className="w-24 h-20 object-contain" />
            </div>

            {/* Right Menu */}
            <div className="flex items-center space-x-6 text-sm font-sans">
               <a href="#" className="hover:text-gray-500 font-bold">Liên hệ</a>
               <div className="flex items-center space-x-1 cursor-pointer">
                  <Globe className="w-4 h-4 hover:text-gray-500" />
                  <span className="hover:text-gray-500 font-bold">USD</span>
               </div>
               <Search className="w-5 h-5 cursor-pointer hover:text-gray-500" />
               <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-500" />
            </div>
         </div>
      </header>
   );
};

export default Header;
