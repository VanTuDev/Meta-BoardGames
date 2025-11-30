import React from "react";

const Collections = () => {
   return (
      <video
         id="collections"
         src="/imgs/Collections/VideoBST.mp4"
         autoPlay
         loop
         playsInline
         controls
         className="
            w-10/12 max-w-[90vw] aspect-[16/10]
            rounded-2xl overflow-hidden
            shadow-2xl mx-auto block
            object-cover
         "
         style={{ borderRadius: "1rem" }} // fallback khi cần bo góc mạnh hơn
      />
   );
};

export default Collections;
