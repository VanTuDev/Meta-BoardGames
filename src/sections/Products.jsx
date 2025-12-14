import React, { useState } from "react";
import { useI18n } from "../i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, Calendar, Package, X, CheckCircle } from "lucide-react";

// Component hiển thị giá sản phẩm
const PriceDisplay = ({ price, salePrice, salePercent, isVertical = false, t }) => {
   const formatPrice = (amount) => {
      return new Intl.NumberFormat('vi-VN', {
         style: 'currency',
         currency: 'VND',
         minimumFractionDigits: 0,
      }).format(amount);
   };

   // Nếu không có giá
   if (!price) {
      return (
         <div className={`${isVertical ? 'mt-2' : 'mt-3'}`}>
            <span className="text-base sm:text-lg font-semibold text-gray-600 italic">
               {t("sections.Products.contactPrice")}
            </span>
         </div>
      );
   }

   const hasSale = salePrice && salePrice < price;

   if (hasSale) {
      return (
         <div className={`flex flex-col gap-1 ${isVertical ? 'mt-2' : 'mt-3'}`}>
            <div className="flex items-center gap-2 flex-wrap">
               <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#90311e]">
                  {formatPrice(salePrice)}
               </span>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-sm sm:text-base text-gray-400 line-through">
                  {formatPrice(price)}
               </span>
            </div>
         </div>
      );
   }

   return (
      <div className={`${isVertical ? 'mt-2' : 'mt-3'}`}>
         <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#90311e]">
            {formatPrice(price)}
         </span>
      </div>
   );
};

// ============================================================
// ORDER MODAL COMPONENT
// ============================================================
const OrderModal = ({ isOpen, onClose, product, t, onSuccess }) => {
   const [formData, setFormData] = useState({
      address: "",
      quantity: "",
      email: ""
   });
   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors(prev => ({ ...prev, [name]: "" }));
      }
   };

   const validateEmail = (email) => {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};

      // Validate address
      if (!formData.address.trim()) {
         newErrors.address = t("sections.Products.orderModal.required");
      }

      // Validate quantity
      if (!formData.quantity.trim()) {
         newErrors.quantity = t("sections.Products.orderModal.required");
      } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
         newErrors.quantity = t("sections.Products.orderModal.invalidQuantity");
      }

      // Validate email
      if (!formData.email.trim()) {
         newErrors.email = t("sections.Products.orderModal.required");
      } else if (!validateEmail(formData.email)) {
         newErrors.email = t("sections.Products.orderModal.invalidEmail");
      }

      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      // Submit form (here you can add API call)
      console.log("Order submitted:", { product, ...formData });

      // Reset form
      setFormData({ address: "", quantity: "", email: "" });
      setErrors({});

      // Close modal
      onClose();

      // Trigger success callback
      if (onSuccess) {
         onSuccess();
      }
   };

   if (!isOpen) return null;

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Backdrop */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] cursor-pointer"
               />

               {/* Modal */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
               >
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto max-h-[90vh] overflow-y-auto">
                     {/* Header */}
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#90311e]">
                           {t("sections.Products.orderModal.title")}
                        </h2>
                        <button
                           onClick={onClose}
                           className="p-2 rounded-full hover:bg-gray-100 transition"
                           aria-label={t("sections.Products.orderModal.close")}
                        >
                           <X className="w-5 h-5 text-gray-600" />
                        </button>
                     </div>

                     {/* Product Info */}
                     {product && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                           <p className="text-sm text-gray-600 mb-1">
                              {t("sections.Products.orderModal.productName")}:
                           </p>
                           <p className="text-lg font-semibold text-[#90311e]">
                              {product.name}
                           </p>
                        </div>
                     )}

                     {/* Form */}
                     <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Address */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {t("sections.Products.orderModal.address")} <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder={t("sections.Products.orderModal.addressPlaceholder")}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90311e] ${errors.address ? "border-red-500" : "border-gray-300"
                                 }`}
                           />
                           {errors.address && (
                              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                           )}
                        </div>

                        {/* Quantity */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {t("sections.Products.orderModal.quantity")} <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="number"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleChange}
                              placeholder={t("sections.Products.orderModal.quantityPlaceholder")}
                              min="1"
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90311e] ${errors.quantity ? "border-red-500" : "border-gray-300"
                                 }`}
                           />
                           {errors.quantity && (
                              <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                           )}
                        </div>

                        {/* Email */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {t("sections.Products.orderModal.email")} <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder={t("sections.Products.orderModal.emailPlaceholder")}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90311e] ${errors.email ? "border-red-500" : "border-gray-300"
                                 }`}
                           />
                           {errors.email && (
                              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                           )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                           <button
                              type="button"
                              onClick={onClose}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                           >
                              {t("sections.Products.orderModal.cancel")}
                           </button>
                           <button
                              type="submit"
                              className="flex-1 px-4 py-2 bg-[#90311e] text-white rounded-lg hover:bg-[#7a2818] transition font-semibold"
                           >
                              {t("sections.Products.orderModal.confirm")}
                           </button>
                        </div>
                     </form>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
};

// ============================================================
// SUCCESS POPUP COMPONENT
// ============================================================
const SuccessPopup = ({ isOpen, onClose, t }) => {
   if (!isOpen) return null;

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Backdrop */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] cursor-pointer"
               />

               {/* Popup */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
               >
                  <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center pointer-events-auto">
                     <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                     <h3 className="text-2xl font-bold text-[#90311e] mb-2">
                        {t("sections.Products.successPopup.title")}
                     </h3>
                     <p className="text-gray-600 mb-6">
                        {t("sections.Products.successPopup.message")}
                     </p>
                     <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-[#90311e] text-white rounded-lg hover:bg-[#7a2818] transition font-semibold"
                     >
                        {t("sections.Products.successPopup.close")}
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
};

// ============================================================
// PRODUCTS COMPONENT
// ============================================================
const Products = () => {
   const { t, locale } = useI18n();
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
   const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
   const products = t("sections.Products.products") || [];
   const featuredProduct = products.find((p) => p.featured) || products.find((p) => p.layout === "horizontal");
   const verticalProducts = products.filter((p) => p.layout === "vertical" && !p.featured);
   const horizontalProducts = products.filter((p) => p.layout === "horizontal" && !p.featured);

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.5,
         },
      },
   };

   const handleQuickBuy = (product) => {
      setSelectedProduct(product);
      setIsOrderModalOpen(true);
   };

   const handleOrderSubmit = () => {
      setIsOrderModalOpen(false);
      setIsSuccessPopupOpen(true);
   };

   const handleCloseOrderModal = () => {
      setIsOrderModalOpen(false);
      setSelectedProduct(null);
   };

   return (
      <section id="products" className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 bg-opacity-0 from-white to-gray-50">
         {/* Title */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-3"
         >
            <div className="max-w-xl">
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-[#90311e] to-[#610C40] bg-clip-text text-transparent">
                  {t("sections.Products.title")}
               </h2>
               <p className="text-sm sm:text-base text-gray-600 italic">
                  {t("sections.Products.subtitle")}
               </p>
            </div>
            <a href="#" className="text-sm text-[#90311e] hover:text-[#610C40] hover:underline font-semibold self-start sm:self-auto transition">
               {t("sections.Products.viewAll")}
            </a>
         </motion.div>

         {/* Featured Product (Combo) */}
         {featuredProduct && (
            <motion.div
               variants={itemVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="mb-6 sm:mb-8"
            >
               <div className="group relative bg-gradient-to-br from-[#90311e] via-[#7a2818] to-[#610C40] rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

               </div>
            </motion.div>
         )}

         {/* Product Grid - Vertical + Horizontal */}
         <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
         >
            {/* Vertical Products */}
            {verticalProducts.map((product) => (
               <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
               >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-h-[240px] sm:max-h-[280px] md:max-h-[320px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                     {/* Badge Container */}
                     <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                        {product.preorder && (
                           <span className="bg-[#e5d6a3] text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                              {t("sections.Products.badge.preorder")}
                           </span>
                        )}
                        {product.badge && product.badge === "New" && (
                           <span className="bg-gradient-to-r from-[#ef4848] to-[#d63031] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                              {t("sections.Products.badge.new")}
                           </span>
                        )}
                        {product.sale === true && (
                           <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-pulse">
                              {t("sections.Products.badge.sale")}
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
                        className="absolute top-0 left-0 w-full h-full object-contain bg-opacity-20 transition-opacity duration-500 group-hover:opacity-100"
                     />

                     {/* Quick Buy button */}
                     <button
                        onClick={() => handleQuickBuy(product)}
                        className="absolute bottom-3 right-3 bg-gradient-to-r from-[#90311e] to-[#610C40] text-white px-4 py-2 rounded-lg font-semibold text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-105 shadow-xl z-20"
                     >
                        {t("sections.Products.quickBuy")}
                     </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5">
                     <h3 className="text-lg sm:text-xl font-bold text-[#90311e] mb-2 group-hover:text-[#610C40] transition-colors">
                        {product.name}
                     </h3>
                     <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">{product.category}</p>

                     {/* Game Info with Icons */}
                     <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                           <Users className="w-3.5 h-3.5 text-[#90311e]" />
                           <span>{product.players}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Calendar className="w-3.5 h-3.5 text-[#90311e]" />
                           <span>{product.age}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Clock className="w-3.5 h-3.5 text-[#90311e]" />
                           <span>{product.time}</span>
                        </div>
                     </div>

                     {/* Price */}
                     <PriceDisplay
                        price={product.price}
                        salePrice={product.salePrice}
                        salePercent={product.salePercent}
                        isVertical={true}
                        t={t}
                     />

                     {/* Description */}
                     <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 mt-3 line-clamp-3">
                        {product.description}
                     </p>

                     {/* Material */}
                     <div className="flex items-start gap-2">
                        <Package className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] sm:text-xs text-gray-500 italic">
                           <span className="font-semibold">{t("sections.Products.labels.material")}:</span> {product.material}
                        </p>
                     </div>
                  </div>
               </motion.div>
            ))}

            {/* Horizontal Products */}
            {horizontalProducts.map((product) => (
               <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="md:col-span-2 group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
               >
                  <div className="flex flex-col md:flex-row">
                     {/* Product Image - bên trái - tỉ lệ 16:9 */}
                     <div className="relative w-full md:w-2/5 lg:w-2/5 aspect-[16/9] md:aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        {/* Badge Container */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                           {product.preorder && (
                              <span className="bg-[#e5d6a3] text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                                 {t("sections.Products.badge.preorder")}
                              </span>
                           )}
                           {product.badge && product.badge === "New" && (
                              <span className="bg-gradient-to-r from-[#ef4848] to-[#d63031] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                                 {t("sections.Products.badge.new")}
                              </span>
                           )}
                           {product.salePrice && product.salePrice < product.price && (
                              <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-pulse">
                                 {t("sections.Products.badge.sale")}
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
                        <button
                           onClick={() => handleQuickBuy(product)}
                           className="absolute bottom-3 right-3 bg-gradient-to-r from-[#90311e] to-[#610C40] text-white px-4 py-2 rounded-lg font-semibold text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-105 shadow-xl z-20"
                        >
                           {t("sections.Products.quickBuy")}
                        </button>
                     </div>

                     {/* Product Info - bên phải */}
                     <div className="w-full md:w-3/5 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#90311e] mb-2 group-hover:text-[#610C40] transition-colors">
                           {product.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 font-medium">{product.category}</p>

                        {/* Game Info with Icons */}
                        <div className="flex flex-wrap gap-4 mb-4 text-xs sm:text-sm text-gray-600">
                           <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#90311e]" />
                              <span>{t("sections.Products.labels.players")}: {product.players}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#90311e]" />
                              <span>{t("sections.Products.labels.age")}: {product.age}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#90311e]" />
                              <span>{t("sections.Products.labels.time")}: {product.time}</span>
                           </div>
                        </div>

                        {/* Price */}
                        <PriceDisplay
                           price={product.price}
                           salePrice={product.salePrice}
                           salePercent={product.salePercent}
                           isVertical={false}
                           t={t}
                        />

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 mt-3 line-clamp-4">
                           {product.description}
                        </p>

                        {/* Material */}
                        <div className="flex items-start gap-2">
                           <Package className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                           <p className="text-xs sm:text-sm text-gray-500 italic">
                              <span className="font-semibold">{t("sections.Products.labels.material")}:</span> {product.material}
                           </p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>

         {/* Order Modal */}
         <OrderModal
            isOpen={isOrderModalOpen}
            onClose={handleCloseOrderModal}
            product={selectedProduct}
            t={t}
            onSuccess={() => setIsSuccessPopupOpen(true)}
         />

         {/* Success Popup */}
         <SuccessPopup
            isOpen={isSuccessPopupOpen}
            onClose={() => setIsSuccessPopupOpen(false)}
            t={t}
         />
      </section>
   );
};

export default Products;
