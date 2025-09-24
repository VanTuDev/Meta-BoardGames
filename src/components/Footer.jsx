import React from "react";

const Footer = () => {
   return (
      <footer className="bg-[#f0e6cc] text-gray-800">
         {/* Top: Newsletter + Links */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Newsletter */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-2">Đăng ký</h3>
               <p className="text-sm mb-4">Nhận mã giảm 10% cho đơn đầu tiên</p>
               <button className="inline-flex items-center justify-center bg-[#5a442a] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#3e2f1e] transition">
                  Get 10% Off
               </button>
            </div>

            {/* About */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-3">Về chúng tôi</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Giới thiệu</a></li>
                  <li><a href="#" className="hover:underline">Cách chơi</a></li>
                  <li><a href="#" className="hover:underline">Cam kết</a></li>
                  <li><a href="#" className="hover:underline">Blog</a></li>
               </ul>
            </div>

            {/* Follow */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-3">Theo dõi</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Facebook</a></li>
                  <li><a href="#" className="hover:underline">Instagram</a></li>
                  <li><a href="#" className="hover:underline">Pinterest</a></li>
                  <li><a href="#" className="hover:underline">Youtube</a></li>
               </ul>
            </div>

            {/* Policies */}
            <div>
               <h3 className="text-base md:text-lg font-semibold mb-3">Chính sách</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Đổi trả</a></li>
                  <li><a href="#" className="hover:underline">Giao hàng</a></li>
                  <li><a href="#" className="hover:underline">Bảo mật</a></li>
                  <li><a href="#" className="hover:underline">Khuyến mãi</a></li>
                  <li><a href="#" className="hover:underline">Liên hệ</a></li>
               </ul>
            </div>
         </div>

         {/* Middle: Company Info compact */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6 text-xs text-gray-700">
            <p className="font-semibold">Công ty TNHH Maztermind</p>
            <p>6/10 Cách Mạng Tháng 8, P.Bến Thành, TP HCM • GPKD 0317015950</p>
            <div className="mt-3">
               <img src="/imgs/Footer/boCongThuong.png" alt="Đã thông báo bộ công thương" className="h-8 md:h-10" />
            </div>
         </div>

         {/* Bottom bar */}
         <div className="border-t border-[#e3d9be]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-gray-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
               <span>© 2025 Maztermind. All rights reserved.</span>
               <div className="flex gap-4">
                  <a href="#" className="hover:underline">Terms</a>
                  <a href="#" className="hover:underline">Privacy</a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
