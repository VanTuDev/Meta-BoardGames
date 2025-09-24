import React from "react";

const Footer = () => {
   return (
      <footer className="bg-[#f0e6cc] text-gray-800 py-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {/* Cột Đăng ký */}
            <div className="col-span-2 md:col-span-2">
               <h3 className="text-lg font-semibold mb-2">Đăng ký</h3>
               <p className="text-sm mb-4">
                  Nhận ngay mã giảm giá 10% cho đơn đặt hàng đầu tiên
               </p>
               <button className="bg-[#5a442a] text-white font-semibold px-5 py-2 rounded-sm hover:bg-[#3e2f1e] transition">
                  Get 10% Off
               </button>

               <div className="mt-6 text-sm">
                  <p className="font-semibold">Công ty TNHH Maztermind</p>
                  <p>Địa chỉ: 6/10 Cách Mạng Tháng 8, P.Bến Thành, TP HCM</p>
                  <p>GPKD: 0317015950, cấp ngày 05/11/2021, tại Sở KH&ĐT TP HCM</p>
               </div>

               <div className="mt-4">
                  <img
                     src="/imgs/Footer/boCongThuong.png"
                     alt="Đã thông báo bộ công thương"
                     className="h-10 md:h-12"
                  />
               </div>

               <p className="mt-4 text-xs text-gray-600">
                  © 2025, Maztermind. Do Shopify cung cấp
               </p>
            </div>

            {/* Các cột link */}
            <div>
               <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Giới thiệu</a></li>
                  <li><a href="#" className="hover:underline">Cách chơi</a></li>
                  <li><a href="#" className="hover:underline">Cam kết</a></li>
                  <li><a href="#" className="hover:underline">Press</a></li>
                  <li><a href="#" className="hover:underline">Blog</a></li>
               </ul>
            </div>

            <div>
               <h3 className="text-lg font-semibold mb-4">Theo dõi</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Facebook</a></li>
                  <li><a href="#" className="hover:underline">Instagram</a></li>
                  <li><a href="#" className="hover:underline">Pinterest</a></li>
                  <li><a href="#" className="hover:underline">Youtube</a></li>
               </ul>
            </div>

            <div>
               <h3 className="text-lg font-semibold mb-4">Hợp tác</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Quà tặng doanh nghiệp</a></li>
                  <li><a href="#" className="hover:underline">Đối tác mua sỉ</a></li>
                  <li><a href="#" className="hover:underline">Thiết kế theo yêu cầu</a></li>
                  <li><a href="#" className="hover:underline">Catalogue sản phẩm</a></li>
               </ul>
            </div>

            <div>
               <h3 className="text-lg font-semibold mb-4">Chính sách</h3>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Đổi trả</a></li>
                  <li><a href="#" className="hover:underline">Giao hàng</a></li>
                  <li><a href="#" className="hover:underline">Bảo mật</a></li>
                  <li><a href="#" className="hover:underline">Khuyến mãi</a></li>
                  <li><a href="#" className="hover:underline">Liên hệ</a></li>
               </ul>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
