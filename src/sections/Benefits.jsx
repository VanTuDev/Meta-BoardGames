import React from "react";
import { FaGem, FaTruck, FaSmile } from "react-icons/fa"; // icon tương tự svg
import { useI18n } from "../i18n";

const icons = [
   <FaGem className="text-3xl text-[#5a442a]" />,
   <FaTruck className="text-3xl text-[#5a442a]" />,
   <FaSmile className="text-3xl text-[#5a442a]" />,
];

const Benefits = () => {
   const { t } = useI18n();
   const benefits = t("sections.Benefits.benefits");

   return (
      <section className="bg-[#ece7d1] py-12">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {Array.isArray(benefits) && benefits.map((item, index) => (
               <div key={item.id} className="flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md mb-4">
                     {icons[index]}
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
            )) || null}
         </div>
      </section>
   );
};

export default Benefits;
