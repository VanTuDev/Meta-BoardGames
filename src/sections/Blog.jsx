import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useI18n } from "../i18n";

const Blog = () => {
   const { t } = useI18n();
   const blogs = t("sections.Blog.blogs") || [];
   const title = t("sections.Blog.title");
   const viewAll = t("sections.Blog.viewAll");

   return (
      <section className="max-w-7xl mx-auto px-6 py-16">
         {/* Header */}
         <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <a
               href="#"
               className="text-sm font-medium text-gray-700 flex items-center gap-1 hover:underline"
            >
               {viewAll}
            </a>
         </div>

         {/* Blog Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(blogs) && blogs.map((blog) => (
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
