import React from "react";
import { FaGem, FaTruck, FaSmile } from "react-icons/fa"; // icon tương tự svg

const benefits = [
   {
      id: 1,
      icon: <FaGem className="text-3xl text-[#5a442a]" />,
      title: "Bảo hành 12 tháng",
      description:
         "Áp dụng với tất cả sản phẩm của Maztermind. An tâm mua sắm tại website chính hãng.",
   },
   {
      id: 2,
      icon: <FaTruck className="text-3xl text-[#5a442a]" />,
      title: "Miễn phí giao hàng",
      description:
         "Giao hàng toàn quốc. Miễn phí vận chuyển với đơn hàng trên 1 triệu đồng.",
   },
   {
      id: 3,
      icon: <FaSmile className="text-3xl text-[#5a442a]" />,
      title: "Thêm ưu đãi 10%",
      description:
         "Nhận ngay mã giảm 10% đối với các khách hàng lần đầu tiên mua sắm tại Maztermind.vn",
   },
];

const Benefits = () => {
   return (
      <section className="bg-[#ece7d1] py-12">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {benefits.map((item) => (
               <div key={item.id} className="flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md mb-4">
                     {item.icon}
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#2b2b2b]">
                     {item.title}
                  </h3>
                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-700 max-w-xs">
                     {item.description}
                  </p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Benefits;
