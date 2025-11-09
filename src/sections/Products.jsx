import React from "react";
import { useI18n } from "../i18n";

const Products = () => {
   const { t, locale } = useI18n();
   const products = t("sections.Products.products") || [];
   return (
      <section id="products" className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
         {/* Title */}
         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
            <div className="max-w-xl">
               <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">{t("sections.Products.title")}</h2>
               <p className="text-gray-500 text-xs italic">
                  {t("sections.Products.subtitle")}
               </p>
            </div>
            <a href="#" className="text-xs text-gray-700 hover:underline self-start sm:self-auto">
               {t("sections.Products.viewAll")}
            </a>
         </div>

         {/* Product Grid - 2 dọc + 1 ngang */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            {/* 2 sản phẩm dọc đầu tiên */}
            {products
               .filter((p) => p.layout === "vertical")
               .map((product) => (
                  <div
                     key={product.id}
                     className="group bg-white/90 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                     {/* Product Image - nhỏ hơn */}
                     <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-h-[220px] sm:max-h-[260px] md:max-h-[300px] overflow-hidden">
                        {/* Badge Container */}
                        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex flex-col gap-1">
                           {product.preorder && (
                              <span className="bg-[#e5d6a3] text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                 {t("sections.Products.badge.preorder")}
                              </span>
                           )}
                           {product.badge && product.badge === "New" && (
                              <span className="bg-[#ef4848] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                 {t("sections.Products.badge.new")}
                              </span>
                           )}
                        </div>

                        {/* Main image */}
                        <img
                           src={product.img}
                           alt={product.name}
                           className="w-full h-full object-contain bg-gray-50 transition-opacity duration-500 group-hover:opacity-0"
                        />
                        {/* Hover image */}
                        <img
                           src={product.hoverImg}
                           alt={`${product.name} Hover`}
                           className="absolute top-0 left-0 w-full h-full object-contain bg-opacity-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />

                        {/* Quick Buy button */}
                        <button className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[#5a442a] px-2 sm:px-3 py-1.5 sm:py-2 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                           <span className="text-white text-[10px] sm:text-xs font-normal">
                              {t("sections.Products.quickBuy")}
                           </span>
                        </button>
                     </div>

                     {/* Product Info */}
                     <div className="p-2.5 sm:p-3">
                        <h3 className="text-sm sm:text-base font-bold text-[#90311e] mb-1">{product.name}</h3>
                        <p className="text-xs text-gray-600 mb-1.5">{product.category}</p>

                        {/* Game Info */}
                        <div className="flex flex-wrap gap-1 text-[10px] text-gray-500 mb-1.5">
                           <span>{t("sections.Products.labels.players")}: {product.players}</span>
                           <span>•</span>
                           <span>{t("sections.Products.labels.age")}: {product.age}</span>
                           <span>•</span>
                           <span>{t("sections.Products.labels.time")}: {product.time}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-700 leading-relaxed mb-1.5 line-clamp-2">
                           {product.description}
                        </p>

                        {/* Material */}
                        <p className="text-[10px] text-gray-500 italic">
                           <span className="font-semibold">{t("sections.Products.labels.material")}:</span> {product.material}
                        </p>
                     </div>
                  </div>
               ))}

            {/* Sản phẩm ngang (span full width) */}
            {products
               .filter((p) => p.layout === "horizontal")
               .map((product) => (
                  <div
                     key={product.id}
                     className="md:col-span-2 group bg-white/90 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                     <div className="flex flex-col md:flex-row">
                        {/* Product Image - bên trái - tỉ lệ 16:9 */}
                        <div className="relative w-full md:w-2/5 lg:w-2/5 aspect-[16/9] md:aspect-[16/9] overflow-hidden">
                           {/* Badge Container */}
                           <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 flex flex-col gap-1">
                              {product.preorder && (
                                 <span className="bg-[#e5d6a3] text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                    {t("sections.Products.badge.preorder")}
                                 </span>
                              )}
                              {product.badge && product.badge === "New" && (
                                 <span className="bg-[#ef4848] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                    {t("sections.Products.badge.new")}
                                 </span>
                              )}
                           </div>

                           {/* Main image */}
                           <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                           />
                           {/* Hover image */}
                           <img
                              src={product.hoverImg}
                              alt={`${product.name} Hover`}
                              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                           />

                           {/* Quick Buy button */}
                           <button className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[#5a442a] px-2 sm:px-3 py-1.5 sm:py-2 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                              <span className="text-white text-[10px] sm:text-xs font-normal">
                                 {t("sections.Products.quickBuy")}
                              </span>
                           </button>
                        </div>

                        {/* Product Info - bên phải */}
                        <div className="w-full md:w-3/5 p-3 sm:p-4 md:p-4 flex flex-col justify-center">
                           <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#90311e] mb-1.5">
                              {product.name}
                           </h3>
                           <p className="text-xs sm:text-sm text-gray-600 mb-1.5">{product.category}</p>

                           {/* Game Info */}
                           <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-gray-500 mb-1.5">
                              <span>{t("sections.Products.labels.players")}: {product.players}</span>
                              <span>•</span>
                              <span>{t("sections.Products.labels.age")}: {product.age}</span>
                              <span>•</span>
                              <span>{t("sections.Products.labels.time")}: {product.time}</span>
                           </div>

                           {/* Description */}
                           <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-1.5 line-clamp-3">
                              {product.description}
                           </p>

                           {/* Material */}
                           <p className="text-[10px] text-gray-500 italic">
                              <span className="font-semibold">{t("sections.Products.labels.material")}:</span> {product.material}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
         </div>
      </section>
   );
};

export default Products;
