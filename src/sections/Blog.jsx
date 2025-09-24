import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const blogs = [
   {
      id: 1,
      title: "GỢI Ý NHỮNG SET QUÀ TẾT Ý NGHĨA CHO MÙA XUÂN NĂM NAY",
      description:
         "Tết Nguyên Đán là dịp để chúng ta bày tỏ sự tri ân và tình cảm với những người thân yêu, đồng nghiệp và đối tác...",
      date: "17 Thg 1, 2024",
      image: "/imgs/Blog/Blog1.webp",
   },
   {
      id: 2,
      title: "HƯỚNG DẪN CÁCH CHƠI BẦU CUA TRĂM TRẬN TRĂM THẮNG",
      description:
         "Trò chơi bầu cua tôm cá là một trò chơi truyền thống giải trí phổ biến ở Việt Nam vào các dịp lễ, đặc biệt là Tết Nguyên Đán...",
      date: "15 Thg 1, 2024",
      image: "/imgs/Blog/Blog2.webp",
   },
   {
      id: 3,
      title: "KHÁM PHÁ NIỀM VUI TẾT VỚI BỘ BẦU CUA Ý GIAO",
      description:
         "Ngày Tết là dịp để gia đình, bạn bè và người thân sum họp, chia sẻ niềm vui và ước nguyện cho năm mới...",
      date: "12 Thg 1, 2024",
      image: "/imgs/Blog/Blog3.webp",
   },
];

const Blog = () => {
   return (
      <section className="max-w-7xl mx-auto px-6 py-16">
         {/* Header */}
         <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Blogs and News</h2>
            <a
               href="#"
               className="text-sm font-medium text-gray-700 flex items-center gap-1 hover:underline"
            >
               View all →
            </a>
         </div>

         {/* Blog Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
               <div
                  key={blog.id}
                  className="flex flex-col group cursor-pointer"
               >
                  {/* Image */}
                  <div className="overflow-hidden rounded">
                     <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex flex-col flex-grow">
                     <h3 className="text-xl font-bold text-gray-900 hover:underline cursor-pointer">
                        {blog.title}
                     </h3>
                     <p className="text-gray-600 text-sm mt-2 flex-grow">
                        {blog.description}
                     </p>
                     <div className="flex items-center text-gray-500 text-sm mt-3">
                        <FaRegCalendarAlt className="mr-2" />
                        {blog.date}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Blog;
