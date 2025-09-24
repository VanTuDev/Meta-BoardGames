import React from "react";

const products = [
   {
      id: 1,
      name: "Majestic Mahjong Set",
      price: "13.990.000₫",
      oldPrice: null,
      badge: "New",
      preorder: true,
      img: "/imgs/Products/ProductMahjongSet.webp",
      hoverImg: "/imgs/Products/ProductMahjongSet2.webp", // ảnh khi hover
   },
   {
      id: 2,
      name: "Portable Chess Set",
      price: "2.350.000₫",
      oldPrice: "2.690.000₫",
      badge: "13% OFF",
      preorder: false,
      img: "/imgs/Products/ProductPortableChess.webp",
      hoverImg: "/imgs/Products/ProductPortableChess2.webp",
   },
   {
      id: 3,
      name: "Colorburst Wooden Domino",
      price: "917.150₫",
      oldPrice: "1.079.000₫",
      badge: "15% OFF",
      preorder: true,
      img: "https://via.placeholder.com/400x600",
      hoverImg: "https://via.placeholder.com/400x600/ff0000/ffffff",
   },
   {
      id: 4,
      name: "Nomad Chess Set",
      price: "4.085.000₫",
      oldPrice: "4.300.000₫",
      badge: "5% OFF",
      preorder: false,
      img: "https://via.placeholder.com/400x600",
      hoverImg: "https://via.placeholder.com/400x600/000000/ffffff",
   },
   {
      id: 5,
      name: "Game of Drunks",
      price: "250.750₫",
      oldPrice: "295.000₫",
      badge: "10% OFF",
      preorder: false,
      img: "https://via.placeholder.com/400x600",
      hoverImg: "https://via.placeholder.com/400x600/00ff00/000000",
   },
   {
      id: 6,
      name: "Mahjong Travel Set",
      price: "3.290.000₫",
      oldPrice: null,
      badge: "New",
      preorder: true,
      img: "/imgs/Products/ProductMahjongSet.webp",
      hoverImg: "/imgs/Products/ProductMahjongSet2.webp",
   },
];

const Products = () => {
   return (
      <section className="max-w-7xl mx-auto px-6 py-12">
         {/* Title */}
         <div className="flex justify-between items-center mb-8">
            <div className="max-w-2xl">
               <h2 className="text-4xl font-bold text-gray-900 mb-5 ">Sản phẩm nổi bật</h2>
               <p className="text-gray-500 mt-2 italic">
                  Khám phá những sản phẩm board games yêu thích nhất, nổi tiếng với thiết kế tinh tế,
                  chất liệu bền vững, và trải nghiệm chơi cao cấp.
               </p>
            </div>
            <a href="#" className="text-sm text-gray-700 hover:underline">
               Xem tất cả →
            </a>
         </div>

         {/* Product Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {products.map((product) => (
               <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
               >
                  {/* Product Image */}
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                     {/* Badge Container */}
                     <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.preorder && (
                           <span className="bg-[#e5d6a3] text-black text-xs font-bold px-2 py-1 rounded">
                              Pre-order
                           </span>
                        )}
                        {product.badge && product.badge.includes("%") && (
                           <span className="bg-[#ef4848] text-white text-xs font-bold px-2 py-1 rounded">
                              {product.badge}
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
                     <button className="absolute bottom-2 right-2 bg-[#5a442a]  px-4 py-3 rounded opacity-0 group-hover:opacity-100 transition duration-300 text-bold">
                        <b className="text-white text-sm font-normal">
                           Mua nhanh
                        </b>
                     </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                     <h3 className="text-base font-medium">{product.name}</h3>
                     <div className="mt-2">
                        <span className="text-red-600 font-semibold">{product.price}</span>{" "}
                        {product.oldPrice && (
                           <span className="line-through text-gray-400 ml-2">
                              {product.oldPrice}
                           </span>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Products;
