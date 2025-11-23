import React from "react";

const Collections = () => {
   return (
      <div className="p-0">
         <video
            id="collections"
            src="/imgs/Collections/VideoBST.mp4"
            autoPlay
            loop
            playsInline
            controls
            className="w-10/12 h-fit max-w-[90vw] aspect-[16/10] object-contain rounded-2xl shadow-2xl mx-auto block"
         />
      </div>

   );
};

export default Collections;
